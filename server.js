let express = require('express');
let app = express();
let reloadMagic = require('./reload-magic.js');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let multer = require('multer');
let cookieParser = require('cookie-parser');
let hash = require('object-hash');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs');
const path = require('path');
const {
    promisify
} = require('util');
const readFile = promisify(fs.readFile);
let upload = multer({
    dest: __dirname + '/uploads/'
});
app.use(cookieParser());

reloadMagic(app);

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets
app.use('/uploads', express.static('uploads')); // Needed for upload images
app.use('/images', express.static('public/images')); //Needed to show images
let dbo = undefined;
let url = 'mongodb+srv://username:password@cluster0-oqzxt.mongodb.net/test?retryWrites=true&w=majority';
MongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    (err, db) => {
        if (err) {
            console.error('An error occurred connecting to MongoDB: ', err);
        } else {
            dbo = db.db('myRecipies');
        }
    }
);
// ====== push to utilities.js ===================
let generateSessionId = () => {
    return '' + Math.floor(Math.random() * 10000000000);
};
let findOne = async (collectionName, criteria) => {
    return new Promise((res, rej) => {
        dbo.collection(collectionName).findOne(criteria, (err, result) => {
            if (err) {
                rej(err);
                return;
            }
            res(result);
        });
    });
};
// ====== push to utilities.js ===================
// Your endpoints go after this line
// =============== endpoint for users ==============================//
app.post('/signup', upload.none(), (req, res) => {
    console.log('signup endpoint', req.body);
    let sEmail = req.body.email;
    let sPassword = hash({
        passwordHashed: req.body.password
    });
    let sFirstName = req.body.firstName;
    console.log('req.body.firstName', req.body.firstName);
    console.log('define sFirstName', sFirstName);
    let sLastName = req.body.lastName;
    dbo.collection('users').findOne({
            email: sEmail
        },
        (err, user) => {
            if (err) {
                console.log('/signup error', err);
                res.json({
                    success: false,
                    error: 'signup error'
                });
                return;
            }
            if (user !== null) {
                console.log('username already taken');
                res.json({
                    success: false,
                    error: 'username already taken'
                });
                return;
            }
            if (user === null) {
                console.log('username available');
                let sessionId = generateSessionId();
                res.cookie('sid', sessionId);
                dbo.collection('users').insertOne({
                    email: sEmail,
                    password: sPassword,
                    firstName: sFirstName,
                    lastName: sLastName,
                    sessionId: sessionId
                });
                let firstNameInitial = sFirstName.charAt(0);
                let lastNameInitial = sLastName.charAt(0);
                console.log('initials', firstNameInitial, lastNameInitial);
                let initials = firstNameInitial + lastNameInitial;
                console.log('initials', initials);
                res.json({
                    success: true,
                    userInitials: initials
                });
                return;
            }
        }
    );
});
app.post('/login', upload.none(), async (req, res) => {
    console.log('request to login', req.body);
    let lEmail = req.body.email;
    console.log('checking password');
    let lPassword = hash({
        passwordHashed: req.body.password
    });

    // let user = await jackFindOne("userIDs", {
    //     email: lEmail
    // });
    dbo.collection('users').findOne({
            email: lEmail
        },
        (err, user) => {
            if (err) {
                console.log('/login error', err);
                res.json({
                    success: false,
                    error: 'login error'
                });
                return;
            }
            if (user === null) {
                console.log('User unknown');
                res.json({
                    success: false,
                    error: 'User unknown'
                });
                return;
            }
            if (user.password === lPassword) {
                let sessionId = generateSessionId();
                res.cookie('sid', sessionId);
                dbo.collection('users').updateOne({
                    email: lEmail
                }, {
                    $set: {
                        sessionId: sessionId
                    }
                });
                let firstNameInitial = user.firstName.charAt(0);
                let lastNameInitial = user.lastName.charAt(0);
                let user_id = user._id;
                let initials = firstNameInitial + lastNameInitial;
                console.log('sending response from login');
                res.json({
                    success: true,
                    userInitials: initials,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
                return;
            } else {
                console.log('error in user or password');
                res.json({
                    success: false,
                    error: 'error in user or password'
                });
                return;
            }
        }
    );
});
app.post('/cookie-check', upload.none(), async (req, res) => {
    console.log('request to search for a cookie', req.body);
    let userSessionId = req.cookies.sid;
    let user = await findOne('users', {
        sessionId: userSessionId
    });
    if (user === null) {
        console.log('no user with such cookie in the userIDs collection');
        res.json({
            success: false
        });
        return;
    }
    if (user !== null) {
        console.log('user associated with the cookie', user);
        let firstNameInitial = user.firstName.charAt(0);
        let lastNameInitial = user.lastName.charAt(0);
        let initials = firstNameInitial + lastNameInitial;
        let user_id = user._id;

        console.log('sending response from login');
        res.json({
            success: true,
            userInitials: initials,
            firstName: user.firstName,
            lastName: user.lastName
        });
        return;
    }
});
app.post('/logout', upload.none(), (req, res) => {
    console.log('request to logout');
    let lgSessionId = req.cookies.sid;
    dbo.collection('users').findOne({
        sessionId: lgSessionId
    }, {
        $set: {
            sessionId: ''
        }
    });
    res.cookie('sid', {
        expires: Date.now()
    });

    res.json({
        success: true
    });
    return;
});
// =============== endpoint for users ==============================//
// =============== endpoint for Recipies ===========================//
app.get('/countRecipes', (req, res) => {
    console.log("request to /recipies/:cat");
    let userSessionId = req.cookies.sid;
    let nbRecipes = {
        nbRecipesAll: 0,
        nbRecipesEntrees: 0,
        nbRecipesAperos: 0,
        nbRecipesPlat: 0,
        nbRecipesDessert: 0
    }
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            // dbo
            //     .collection("recipies")
            //     .countDocuments({
            //             userId: user._id,
            //         },
            //         (err, nbRecipesAll) => {
            //             if (err) {
            //                 console.log('erreur in nbRecipes', err)
            //                 res.json({
            //                     success: false
            //                 });
            //                 return;
            //             }
            //             console.log("nbRecipes", nbRecipesAll);
            //             nbRecipes.nbRecipesAll = nbRecipesAll
            //             // console.log('nbRecipes', nbRecipes)
            //         }
            //     )
            dbo.collection("recipies").countDocuments({
                    userId: user._id,
                    category: 'aperos'
                },
                (err, nbRecipesAperos) => {
                    if (err) {
                        console.log('erreur in nbRecipesAperos', err)
                        res.json({
                            success: false
                        });
                        return;
                    }
                    console.log("nbRecipesAperos", nbRecipesAperos);
                    nbRecipes.nbRecipesAperos = nbRecipesAperos

                    // }
                    // )
                    dbo.collection("recipies").countDocuments({
                            userId: user._id,
                            category: 'entrees'
                        },
                        (err, nbRecipesEntrees) => {
                            if (err) {
                                console.log('erreur in nbRecipesEntrees', err)
                                res.json({
                                    success: false
                                });
                                return;
                            }
                            // console.log('user', user)
                            console.log("nbRecipesEntrees", nbRecipesEntrees);
                            nbRecipes.nbRecipesEntrees = nbRecipesEntrees

                            //     }
                            // )
                            dbo.collection("recipies").countDocuments({
                                    userId: user._id,
                                    category: 'plats'
                                },
                                (err, nbRecipesPlat) => {
                                    if (err) {
                                        console.log('erreur in nbRecipesPlat', err)
                                        res.json({
                                            success: false
                                        });
                                        return;
                                    }
                                    console.log("nbRecipesPlat", nbRecipesPlat);
                                    nbRecipes.nbRecipesPlat = nbRecipesPlat

                                    //     }
                                    // )
                                    dbo
                                        .collection("recipies")
                                        .countDocuments({
                                                userId: user._id,
                                                category: 'desserts'
                                            },
                                            (err, nbRecipesDessert) => {
                                                if (err) {
                                                    console.log('erreur in nbRecipesDessert', err)
                                                    res.json({
                                                        success: false
                                                    });
                                                    return;
                                                }
                                                console.log("nbRecipesDessert", nbRecipesDessert);
                                                nbRecipes.nbRecipesDessert = nbRecipesDessert
                                                console.log('nbRecipes', nbRecipes)
                                                res.json({
                                                    success: true,
                                                    nbRecipes: nbRecipes
                                                });
                                                return;
                                            }
                                        )
                                })
                        })
                }
            )
        })
})
app.post('/detectText', upload.single('img'), async (req, res) => {
    console.log('request to /detectText', req.body);
    // if (img === 'null') {
    //     console.log('pas image')
    //     res.json({
    //         success: false
    //     });
    //     return;
    // }
    let userSessionId = req.cookies.sid;
    let file = req.file;
    console.log('file', file)
    if (file === undefined) {
        console.log('pas image')
        res.json({
            success: false
        });
        return;
    }
    let path = req.file.path
    let frontendPath = [];
    if (file) frontendPath.push('/uploads/' + file.filename);
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    console.log('Files to process: ');
    // Performs label detection on the image file
    const request = {
        image: {
            source: {
                filename: path
            }
        }
    };
    client
        .textDetection(request)
        .then(response => {
            let text = response[0].fullTextAnnotation.text
            let textArray = text.split('\n')
            console.log('textArray', textArray)
            res.send(
                JSON.stringify({
                    success: true,
                    text: textArray

                })
            );
        })
        .catch(err => {
            console.error(err);
        });

});
app.post("/newRecipe", upload.single("img"), (req, res) => {
    console.log("request to /newRecipe", req.body);
    console.log("req.body.recipe", req.body.recipe);
    let recipe = JSON.parse(req.body.recipe)
    console.log('req.body.recipe.category', recipe.category)
    let userSessionId = req.cookies.sid;
    let file = req.file;
    console.log('file', file)
    let path = req.file.path
    let frontendPath = [];
    if (file) frontendPath.push('/uploads/' + file.filename);
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            console.log('user', user)
            let d = new Date();
            let time = d.getTime();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            let creationDate = "" + day + "/" + month + "/" + year + "";
            dbo.collection("recipies").insertOne({
                    userId: user._id,
                    category: recipe.category,
                    title: recipe.title,
                    ingredients: recipe.ingredients,
                    todo: recipe.todo,
                    cookingTime: recipe.cookingTime,
                    preparationTime: recipe.preparationTime,
                    nbPerson: recipe.nbPerson,
                    favorite: recipe.favorite,
                    tags: recipe.tags,
                    picture: recipe.picture,
                    notes: recipe.notes,
                    url: recipe.url,
                    frontendPath: frontendPath[0],
                    newRecipeCreationTime: time,
                    newRecipeCreationDate: creationDate
                },
                (err, insertedRecipe) => {
                    res.json({
                        success: true,
                        insertedItem: insertedRecipe
                    });
                }
            );
        }
    );
});
app.post("/editRecipe", upload.single("img"), (req, res) => {
    console.log("request to /editRecipe", req.body);
    console.log("req.body.recipe", req.body.recipe);
    let recipe = JSON.parse(req.body.recipe)
    let recipe_id = recipe._id
    let userSessionId = req.cookies.sid;
    let file = req.file;
    let frontendPath = [];
    if (file !== undefined) {
        let path = req.file.path

        if (file) frontendPath.push('/uploads/' + file.filename);
    } else frontendPath[0] = recipe.frontendPath
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            let d = new Date();
            let time = d.getTime();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            let updateDate = "" + day + "/" + month + "/" + year + "";
            dbo.collection("recipies").updateOne({
                    _id: ObjectId(recipe_id)
                }, {
                    $set: {
                        // userId: user._id,
                        category: recipe.category,
                        title: recipe.title,
                        ingredients: recipe.ingredients,
                        todo: recipe.todo,
                        cookingTime: recipe.cookingTime,
                        preparationTime: recipe.preparationTime,
                        nbPerson: recipe.nbPerson,
                        favorite: recipe.favorite,
                        tags: recipe.tags,
                        picture: recipe.picture,
                        notes: recipe.notes,
                        url: recipe.url,
                        frontendPath: frontendPath[0],
                        recipeUpdateTime: time,
                        recipeUpdateDate: updateDate
                    }
                },
                (err, updatedRecipe) => {
                    if (err) {
                        console.log("error", err);
                        res.json({
                            success: false
                        });
                        return;
                    } else {
                        dbo.collection("recipies").findOne({
                            _id: ObjectId(recipe_id)
                        }, (err, newRecipe) => {
                            if (err) {
                                console.log("error", err);
                                res.json({
                                    success: false
                                });
                                return;
                            } else {
                                // console.log('newRecipe', newRecipe)
                                console.log("done updating recipe favorite");
                                res.json({
                                    success: true,
                                    recipe: newRecipe
                                });
                                return;
                            }
                        })
                    }
                }
            );
        }
    );
});
app.post("/changefavoriterecipe", upload.none(), (req, res) => {
    console.log("request to /changeRecipe", req.body);
    // console.log("req.body.recipe_id", req.body.recipe_id);
    // console.log("req.body.favorite", req.body.favorite);
    let recipe_id = req.body.recipe_id
    let recipe_favorite = JSON.parse(req.body.favorite)
    let userSessionId = req.cookies.sid;

    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            dbo
                .collection("recipies")
                .updateOne({
                    _id: ObjectId(recipe_id)
                }, {
                    $set: {
                        favorite: recipe_favorite
                    }
                }, (err, updatedRecipe) => {
                    if (err) {
                        console.log("error", err);
                        res.json({
                            success: false
                        });
                        return;
                    } else {
                        dbo.collection("recipies").findOne({
                            _id: ObjectId(recipe_id)
                        }, (err, newRecipe) => {
                            if (err) {
                                console.log("error", err);
                                res.json({
                                    success: false
                                });
                                return;
                            } else {
                                // console.log('newRecipe', newRecipe)
                                console.log("done updating recipe favorite");
                                res.json({
                                    success: true,
                                    recipe: newRecipe
                                });
                                return;
                            }
                        })
                    }
                })
        }
    );
});
app.get('/getrecipies/:cat', (req, res) => {
    console.log("request to /recipies/:cat");
    let category = req.params.cat
    let userSessionId = req.cookies.sid;
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            dbo
                .collection("recipies")
                .find({
                    userId: user._id,
                    category: category
                })
                .toArray((err, recipies) => {
                    if (err) {
                        res.json({
                            success: false
                        });
                        return;
                    }
                    // console.log("recipies", recipies);
                    res.json({
                        success: true,
                        recipies: recipies
                    });
                });
        })
})
app.get('/getfavorites', (req, res) => {
    console.log("request to /getfavorites");
    let userSessionId = req.cookies.sid;
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            dbo
                .collection("recipies")
                .find({
                    userId: user._id,
                    favorite: true
                })
                .toArray((err, recipies) => {
                    if (err) {
                        res.json({
                            success: false
                        });
                        return;
                    }
                    // console.log("recipies", recipies);
                    res.json({
                        success: true,
                        recipies: recipies
                    });
                });
        })
})
app.get("/allRecipies", (req, res) => {
    console.log("request to allRecipies end point");
    let userSessionId = req.cookies.sid;
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            dbo
                .collection("recipies")
                .find({
                    userId: user._id,
                })
                .toArray((err, recipies) => {
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        recipies: recipies
                    });
                });
        })
});
app.get("/favoritesRecipies", (req, res) => {
    console.log("request to allRecipies end point");
    let userSessionId = req.cookies.sid;
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            dbo
                .collection("recipies")
                .find({
                    userId: user._id,
                    favorite: true
                })
                .toArray((err, recipies) => {
                    console.log('recipies', recipies)
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        recipies: recipies
                    });
                });
        })
});
app.get('/getrecipe/:id', (req, res) => {
    console.log("request to /getrecipe/:id");
    let recipe_id = req.params.id
    let userSessionId = req.cookies.sid;
    dbo.collection("users").findOne({
            sessionId: userSessionId
        },
        (err, user) => {
            if (err) {
                console.log("error", user);
                res.json({
                    success: false
                });
                return;
            }
            if (user === null) {
                console.log("no userId found");
                res.json({
                    success: false
                });
                return;
            }
            dbo
                .collection("recipies")
                .findOne({
                        userId: user._id,
                        _id: ObjectId(recipe_id)
                    },
                    (err, recipe) => {
                        if (err) {
                            res.json({
                                success: false
                            });
                            return;
                        }
                        // console.log("recipies", recipies);
                        res.json({
                            success: true,
                            recipe: recipe
                        });
                    });
        })
})
// /**
//  * Given a set of image file paths, extract the text and run them through the
//  * Cloud Vision API.
//  * @param {Index} index The stateful `Index` Object.
//  * @param {string[]} inputFiles The list of files to process.
//  * @returns {Promise<void>}
//  */
// async function getTextFromFiles(index, inputFiles) {
//     // Read all of the given files and provide request objects that will be
//     // passed to the Cloud Vision API in a batch request.
//     const requests = await Promise.all(
//         inputFiles.map(async filename => {
//             const content = await readFile(filename);
//             console.log(` 👉 ${filename}`);
//             return {
//                 image: {
//                     content: content.toString('base64'),
//                 },
//                 features: [{
//                     type: 'TEXT_DETECTION'
//                 }],
//             };
//         })
//     );
//     console.log('requests', requests)
//     // Make a call to the Vision API to detect text
//     const results = await client.batchAnnotateImages({
//         requests
//     });
//     console.log('results', results)
//     const detections = results[0].responses;
//     // await Promise.all(
//     //     inputFiles.map(async (filename, i) => {
//     //         const response = detections[i];
//     //         if (response.error) {
//     //             console.info(`API Error for ${filename}`, response.error);
//     //             return;
//     //         }
//     //         await extractDescriptions(filename, index, response);
//     //     })
//     // );
// }

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
    // needed for react router
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
    console.log('Server running on port 4000');
});