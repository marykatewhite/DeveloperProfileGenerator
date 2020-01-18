function gogogo() {
    const axios = require("axios");
    const inquirer = require("inquirer");


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
                console.log(profpic)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

gogogo();