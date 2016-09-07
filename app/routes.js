// app/routes.js
// expose the routes to our app with module.exports

module.exports = function (app) {

    //Smoking Stats
    var csv = require("fast-csv");
    var HashMap = require('hashmap');

    var allSmokingStats = [];
    var genderSmokingStatsMap = new HashMap();
    var raceSmokingStatsMap = new HashMap();

    csv.fromPath("./app/resources/smoking_adults_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['percentage'] = formatData(data.Adults);
            allSmokingStats.push(stats);
        })
        .on("end", function () {
            console.log("smoking adults stats data are loaded");
        });


    csv.fromPath("./app/resources/smoking_gender_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['male'] = formatData(data.Male);
            stats['female'] = formatData(data.Female);
            genderSmokingStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("smoking gender stats data are loaded");
        });

    csv.fromPath("./app/resources/smoking_race_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['white'] = formatData(data.White);
            stats['black'] = formatData(data.Black);
            stats['hispanic'] = formatData(data.Hispanic);
            stats['asianHawPac'] = formatData(data["Asian/Native Hawaiian and Pacific Islander"]);
            stats['nativeAmerican'] = formatData(data["American Indian/Alaska Native"]);
            stats['other'] = formatData(data.Other);
            stats['allAdults'] = formatData(data["All Adults"]);
            raceSmokingStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("smoking race stats data are loaded");
        });

    //Asthma
    var allAsthmaStats = [];
    var genderAsthmaStatsMap = new HashMap();
    var raceAsthmaStatsMap = new HashMap();

    csv.fromPath("./app/resources/asthma_adults_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['percentage'] = formatData(data["Asthma Prevalence Among Adults"]);
            allAsthmaStats.push(stats);
        })
        .on("end", function () {
            console.log("asthma adults stats data are loaded");
        });


    csv.fromPath("./app/resources/asthma_gender_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['male'] = formatData(data.Male);
            stats['female'] = formatData(data.Female);
            genderAsthmaStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("asthma gender stats data are loaded");
        });

    csv.fromPath("./app/resources/asthma_race_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['white'] = formatData(data.White);
            stats['black'] = formatData(data.Black);
            stats['hispanic'] = formatData(data.Hispanic);
            stats['asianHawPac'] = formatData(data["Asian/Native Hawaiian and Pacific Islander"]);
            stats['nativeAmerican'] = formatData(data["American Indian/Alaska Native"]);
            stats['other'] = formatData(data.Other);
            stats['allAdults'] = formatData(data["All Adults"]);
            raceAsthmaStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("asthma race stats data are loaded");
        });

    //Mental health stats

    var allPoorMentalHealthStats = [];
    var genderPoorMentalHealthStatsMap = new HashMap();
    var racePoorMentalHealthStatsMap = new HashMap();

    csv.fromPath("./app/resources/mental_health_adults_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['mentalHealth'] = formatData(data['Poor Mental Health Among Adults']);
            allPoorMentalHealthStats.push(stats);
        })
        .on("end", function () {
            console.log("poor mental health adults stats data are loaded");
        });

    csv.fromPath("./app/resources/mental_health_gender_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['male'] = formatData(data.Male);
            stats['female'] = formatData(data.Female);
            genderPoorMentalHealthStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("poor mental health gender stats data are loaded");
        });

    csv.fromPath("./app/resources/mental_health_race_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['white'] = formatData(data.White);
            stats['black'] = formatData(data.Black);
            stats['hispanic'] = formatData(data.Hispanic);
            stats['asianHawPac'] = formatData(data["Asian/Native Hawaiian and Pacific Islander"]);
            stats['nativeAmerican'] = formatData(data["American Indian/Alaska Native"]);
            stats['other'] = formatData(data.Other);
            racePoorMentalHealthStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("poor mental health race stats data are loaded");
        });

    // Obesity

    var allObesityStats = [];
    var genderObesityStatsMap = new HashMap();
    var raceObesityStatsMap = new HashMap();

    csv.fromPath("./app/resources/obesity_adults_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['percentage'] = formatData(data['Adult Overweight/Obesity Rate']);
            allObesityStats.push(stats);
        })
        .on("end", function () {
            console.log("obesity adults stats data are loaded");
        });

    csv.fromPath("./app/resources/obesity_gender_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['male'] = formatData(data.Male);
            stats['female'] = formatData(data.Female);
            genderObesityStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("obesity gender stats data are loaded");
        });

    csv.fromPath("./app/resources/obesity_race_stats.csv", {headers: true})
        .on("data", function (data) {
            var stats = {};
            stats['location'] = data.Location;
            stats['white'] = formatData(data.White);
            stats['black'] = formatData(data.Black);
            stats['hispanic'] = formatData(data.Hispanic);
            stats['asianHawPac'] = formatData(data["Asian/Native Hawaiian and Pacific Islander"]);
            stats['nativeAmerican'] = formatData(data["American Indian/Alaska Native"]);
            stats['other'] = formatData(data.Other);
            stats['allAdults'] = formatData(data["All Adults"]);
            raceObesityStatsMap.set(data.Location, stats);
        })
        .on("end", function () {
            console.log("obesity race stats data are loaded");
        });

    app.get('/api/stats/:type', function (req, res) {

        if ("smoking" == req.params.type.toString()) {
            res.json(allSmokingStats);
        } else if ("asthma" == req.params.type.toString()) {
            res.json(allAsthmaStats);
        } else if ("mentalhealth" == req.params.type.toString()) {
            res.json(allPoorMentalHealthStats);
        } else if ("obesity" == req.params.type.toString()) {
            res.json(allObesityStats);
        } else {
            res.json("Invalid type has been sent");
        }
    });

    app.get('/api/stats/:type/gender/:state', function (req, res) {

        if ("smoking" == req.params.type.toString()) {
            res.json(genderSmokingStatsMap.get(req.params.state));
        } else if ("asthma" == req.params.type.toString()) {
            res.json(genderAsthmaStatsMap.get(req.params.state));
        } else if ("mentalhealth" == req.params.type.toString()) {
            res.json(genderPoorMentalHealthStatsMap.get(req.params.state));
        } else if ("obesity" == req.params.type.toString()) {
            res.json(genderObesityStatsMap.get(req.params.state));
        } else {
            res.json("Invalid type has been sent");
        }
    });

    app.get('/api/stats/:type/race/:state', function (req, res) {
        if ("smoking" == req.params.type.toString()) {
            res.json(raceSmokingStatsMap.get(req.params.state));
        } else if ("asthma" == req.params.type.toString()) {
            res.json(raceAsthmaStatsMap.get(req.params.state));
        } else if ("mentalhealth" == req.params.type.toString()) {
            res.json(racePoorMentalHealthStatsMap.get(req.params.state));
        } else if ("obesity" == req.params.type.toString()) {
            res.json(raceObesityStatsMap.get(req.params.state));
        } else {
            res.json("Invalid type has been sent");
        }
    });
};

var formatData = function (data) {
    if (data == 'NSD') {
        return 0.0;
    }
    return (parseFloat(data) * 100).toFixed(2);
};
