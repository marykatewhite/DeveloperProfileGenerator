function gogogo() {
    const axios = require("axios");
    const inquirer = require("inquirer");
    const puppeteer = require("puppeteer");
    const fs = require("fs-extra");


    let username;
    let fullname;
    let profpic;
    let location;
    let profileURL;
    let blogURL;
    let bio;
    let publicRepos;
    let followers
    let starredRepos;
    let following;
    let backgroundColor;


    inquirer.prompt([{
        message: "Enter a username:",
        name: "username"
    },
    {
        message: "What is your favorite color?",
        name: "backgroundColor"
    }])
        .then(function ({ username, backgroundColor }) {
            username = username;
            backgroundColor = backgroundColor;
            const apiurl = `https://api.github.com/users/${username}`;
            retrieveData(apiurl);
        });



    function retrieveData(apiurl) {

        axios.get(apiurl)
            .then(function (response) {

                profpic = response.data.avatar_url;
                fullname = response.data.name;
                location = response.data.location;
                profileURL = response.data.html_url;
                blogURL = response.data.blog;
                bio = response.data.bio;
                publicRepos = response.data.public_repos;
                followers = response.data.followers;
                starredRepos = response.data.starred_url.length;
                following = response.data.following;
                layout();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // function layout() {
    //     const developerprofile = 
    //     `<!DOCTYPE html>
    //     <html lang="en">

    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    //             integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    //         <title>${fullname}</title>
    //         <style>
    //             .jumbotron {
    //                 color: purple;
    //                 background: red;
    //                 text-align: center;
    //             }

    //             .img {
    //                 height: 300px;
    //                 width: auto;
    //                 align-content: center;
    //             }

    //             h1,
    //             p,
    //             h2,
    //             h3 {
    //                 color: black;
    //             }
    //         </style>
    //     </head>

    //     <body>

    //         <div class="jumbotron">
    //                 <img src="${profpic}" class="mx-auto d-block mb-5" alt="${fullname}s's picture">

    //                 <h1 class="display-4">Hi! I'm ${fullname}!</h1>
    //                 <p class="lead">I'm from ${location}</p>


    //                 <a href="https://www.google.com/maps/place/${location}" target="blank">
    //                     <i class="fas fa-map-marker-alt fa-xl"></i>
    //                 </a>

    //                 <a href="${profileURL}" target="blank">
    //                     <i class="fab fa-github fa-xl"></i>
    //                 </a>

    //                 <a href="${blogURL}" target="blank">
    //                     <i class="fas fa-rss fa-xl"></i>
    //                 </a>


    //                 <h3 class="lead">${bio}</h3>
    //                 <h2 class="lead">Number of github repos: ${publicRepos}</h2>
    //                 <h2 class="lead">Number of github stars: ${starredRepos}</h2>
    //                 <h2 class="lead">Number of github followers: ${followers}</h2>
    //                 <h2 class="lead">Number of github following: ${following}</h2>
    //         </div>

    //         <script src="https://kit.fontawesome.com/aaecb17ad1.js" crossorigin="anonymous"></script>
    //         <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    //             integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
    //             crossorigin="anonymous"></script>
    //         <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    //             integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    //             crossorigin="anonymous"></script>
    //         <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    //             integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    //             crossorigin="anonymous"></script>
    //     </body>
    //     </html>`
    // }

    async function layout() {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(
                `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <title>${fullname}</title>
            <style>
                .jumbotron {
                    color: purple;
                    background: ${backgroundColor};
                    text-align: center;
                }
        
                .img {
                    height: 100px;
                    width: auto;
                    align-content: center;
                }
        
                h1,
                p,
                h2,
                h3 {
                    color: black;
                }
            </style>
        </head>
        
        <body>
        
            <div class="jumbotron">
                    <img src="${profpic}" class="mx-auto d-block mb-5" alt="${fullname}s's picture">
        
                    <h1 class="display-4">Hi! I'm ${fullname}!</h1>
                    <p class="lead">I'm from ${location}</p>
        
        
                    <a href="https://www.google.com/maps/place/${location}" target="blank">
                        <i class="fas fa-map-marker-alt fa-xl"></i>
                    </a>
        
                    <a href="${profileURL}" target="blank">
                        <i class="fab fa-github fa-xl"></i>
                    </a>
        
                    <a href="${blogURL}" target="blank">
                        <i class="fas fa-rss fa-xl"></i>
                    </a>
        
        
                    <h3 class="lead">${bio}</h3>
                    <h2 class="lead">Number of github repos: ${publicRepos}</h2>
                    <h2 class="lead">Number of github stars: ${starredRepos}</h2>
                    <h2 class="lead">Number of github followers: ${followers}</h2>
                    <h2 class="lead">Number of github following: ${following}</h2>
            </div>
        
            <script src="https://kit.fontawesome.com/aaecb17ad1.js" crossorigin="anonymous"></script>
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                crossorigin="anonymous"></script>
        </body>
        </html>`
            );
            await page.emulateMedia('screen');
            await page.pdf({
                path: `${fullname}.pdf`,
                format: 'A4',
                printBackground: true
            });

            console.log('done');
            await browser.close();
            process.exit();
        }
        catch (e) {
            console.log('error', e)
        }
    };
}

gogogo();