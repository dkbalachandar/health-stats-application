google.charts.load('current', {'packages': ['geochart', 'corechart']});
google.charts.setOnLoadCallback(drawSmokingRegionsMap);
google.charts.setOnLoadCallback(drawAsthmaRegionsMap);
google.charts.setOnLoadCallback(drawMentalHealthRegionsMap);
google.charts.setOnLoadCallback(drawObesityRegionsMap);

function drawSmokingRegionsMap() {
    var jsonData = $.ajax({
        url: "/api/stats/smoking",
        dataType: "json",
        async: false
    }).responseText;

    var contentAsArray = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'State');
    dataTable.addColumn('number', 'Adults %');

    for (var i = 0; i < contentAsArray.length; i++) {
        dataTable.addRow([contentAsArray[i].location, parseFloat(contentAsArray[i].percentage)]);
    }

    var options = {
        region: 'US',
        resolution: 'provinces',
        backgroundColor: '#81d4fa',
        colorAxis: {colors: ['#00853f', '#e31b23']},
        datalessRegionColor: '#f8bbd0',
        enableRegionInteractivity: true,
        tooltip: {trigger: 'focus'},
        defaultColor: '#f5f5f5'
    };
    var chart = new google.visualization.GeoChart(document.getElementById('smoking-geochart-colors'));
    chart.draw(dataTable, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);

    //Default state is Ohio
    chart.setSelection([{row: 1, column: 1}]);
    $('#smoking-currentState').text('Ohio');
    drawSmokingGenderChart('Ohio');
    drawSmokingRaceChart('Ohio');

    function selectHandler(e) {
        var selection = chart.getSelection();
        var state = '';
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                state = dataTable.getFormattedValue(item.row, item.column);
            } else if (item.row != null) {
                state = dataTable.getFormattedValue(item.row, 0);
            } else if (item.column != null) {
                state = dataTable.getFormattedValue(0, item.column);
            }
        }
        if (state == '') {
            state = 'nothing';
        }
        $('#smoking-stats-link').click();
        console.log(state);
        drawSmokingGenderChart(state);
        drawSmokingRaceChart(state);
        $('#smoking-currentState').text(state);
    }
}

function drawSmokingGenderChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/smoking/gender/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Gender');
    dataTable.addColumn('number', 'Gender %');
    dataTable.addRow(['Male', parseFloat(content.male)]);
    dataTable.addRow(['Female', parseFloat(content.female)]);

    var options = {
        title: 'Smoking Stats by Gender',
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('smoking-piechart-gender'));
    chart.draw(dataTable, options);
}

function drawSmokingRaceChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/smoking/race/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Race');
    dataTable.addColumn('number', 'Race %');

    dataTable.addRow(['White', parseFloat(content.white)]);
    dataTable.addRow(['Black', parseFloat(content.black)]);
    dataTable.addRow(['Hispanic', parseFloat(content.hispanic)]);
    dataTable.addRow(['Asian/Native Hawaiian and Pacific Islander', parseFloat(content.asianHawPac)]);
    dataTable.addRow(['American Indian/Alaska Native', parseFloat(content.nativeAmerican)]);
    dataTable.addRow(['Other', parseFloat(content.other)]);
    dataTable.addRow(['All Adults', parseFloat(content.allAdults)]);
    var options = {
        title: 'Smoking Stats by Race/Ethnicity',
        sliceVisibilityThreshold: 0,
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('smoking-piechart-race'));
    chart.draw(dataTable, options);
}

function drawAsthmaRegionsMap() {
    var jsonData = $.ajax({
        url: "/api/stats/asthma",
        dataType: "json",
        async: false
    }).responseText;

    var contentAsArray = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'State');
    dataTable.addColumn('number', 'Adults %');

    for (var i = 0; i < contentAsArray.length; i++) {
        dataTable.addRow([contentAsArray[i].location, parseFloat(contentAsArray[i].percentage)]);
    }

    var options = {
        region: 'US',
        resolution: 'provinces',
        backgroundColor: '#81d4fa',
        colorAxis: {colors: ['#00853f', '#e31b23']},
        datalessRegionColor: '#f8bbd0',
        enableRegionInteractivity: true,
        tooltip: {trigger: 'focus'},
        defaultColor: '#f5f5f5'
    };
    var chart = new google.visualization.GeoChart(document.getElementById('asthma-geochart-colors'));
    chart.draw(dataTable, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);

    //Default state is Ohio
    $('#asthma-currentState').text('Ohio');
    drawAsthmaGenderChart('Ohio');
    drawAsthmaRaceChart('Ohio');

    function selectHandler(e) {
        var selection = chart.getSelection();
        var state = '';
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                state = dataTable.getFormattedValue(item.row, item.column);
            } else if (item.row != null) {
                state = dataTable.getFormattedValue(item.row, 0);
            } else if (item.column != null) {
                state = dataTable.getFormattedValue(0, item.column);
            }
        }
        if (state == '') {
            state = 'nothing';
        }
        $('#asthma-stats-link').click();
        console.log(state);
        drawAsthmaGenderChart(state);
        drawAsthmaRaceChart(state);
        $('#asthma-currentState').text(state);
    }
}

function drawAsthmaGenderChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/asthma/gender/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Gender');
    dataTable.addColumn('number', 'Gender %');
    dataTable.addRow(['Male', parseFloat(content.male)]);
    dataTable.addRow(['Female', parseFloat(content.female)]);

    var options = {
        title: 'Adult Self-Reported Current Asthma Prevalence Rate by Gender',
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('asthma-piechart-gender'));
    chart.draw(dataTable, options);
}

function drawAsthmaRaceChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/asthma/race/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Race');
    dataTable.addColumn('number', 'Race %');

    dataTable.addRow(['White', parseFloat(content.white)]);
    dataTable.addRow(['Black', parseFloat(content.black)]);
    dataTable.addRow(['Hispanic', parseFloat(content.hispanic)]);
    dataTable.addRow(['Asian/Native Hawaiian and Pacific Islander', parseFloat(content.asianHawPac)]);
    dataTable.addRow(['American Indian/Alaska Native', parseFloat(content.nativeAmerican)]);
    dataTable.addRow(['Other', parseFloat(content.other)]);
    dataTable.addRow(['All Adults', parseFloat(content.allAdults)]);
    var options = {
        title: 'Adult Self-Reported Current Asthma Prevalence Rate by Race/Ethnicity',
        sliceVisibilityThreshold: 0,
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('asthma-piechart-race'));
    chart.draw(dataTable, options);
}


function drawMentalHealthRegionsMap() {
    var jsonData = $.ajax({
        url: "/api/stats/mentalhealth",
        dataType: "json",
        async: false
    }).responseText;

    var contentAsArray = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'State');
    dataTable.addColumn('number', 'Adults %');

    for (var i = 0; i < contentAsArray.length; i++) {
        dataTable.addRow([contentAsArray[i].location, parseFloat(contentAsArray[i].mentalHealth)]);
    }
    var options = {
        region: 'US',
        resolution: 'provinces',
        backgroundColor: '#81d4fa',
        colorAxis: {colors: ['#00853f', '#e31b23']},
        datalessRegionColor: '#f8bbd0',
        enableRegionInteractivity: true,
        tooltip: {trigger: 'focus'},
        defaultColor: '#f5f5f5'
    };
    var chart = new google.visualization.GeoChart(document.getElementById('mentalhealth-geochart-colors'));
    chart.draw(dataTable, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);

    //Default state is Ohio
    //chart.setSelection([{row:1, column:1}]);
    $('#mentalhealth-currentState').text('Ohio');
    drawMentalHealthGenderChart('Ohio');
    drawMentalHealthRaceChart('Ohio');

    function selectHandler(e) {
        var selection = chart.getSelection();
        var state = '';
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                state = dataTable.getFormattedValue(item.row, item.column);
            } else if (item.row != null) {
                state = dataTable.getFormattedValue(item.row, 0);
            } else if (item.column != null) {
                state = dataTable.getFormattedValue(0, item.column);
            }
        }
        if (state == '') {
            state = 'nothing';
        }
        $('#mentalhealth-stats-link').click();
        console.log(state);
        drawMentalHealthGenderChart(state);
        drawMentalHealthRaceChart(state);
        $('#mentalhealth-currentState').text(state);
    }
}

function drawMentalHealthGenderChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/mentalhealth/gender/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Gender');
    dataTable.addColumn('number', 'Gender %');
    dataTable.addRow(['Male', parseFloat(content.male)]);
    dataTable.addRow(['Female', parseFloat(content.female)]);

    var options = {
        title: 'Poor Mental Health Stats by Gender',
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('mentalhealth-piechart-gender'));
    chart.draw(dataTable, options);
}

function drawMentalHealthRaceChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/mentalhealth/race/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Race');
    dataTable.addColumn('number', 'Race %');

    dataTable.addRow(['White', parseFloat(content.white)]);
    dataTable.addRow(['Black', parseFloat(content.black)]);
    dataTable.addRow(['Hispanic', parseFloat(content.hispanic)]);
    dataTable.addRow(['Asian/Native Hawaiian and Pacific Islander', parseFloat(content.asianHawPac)]);
    dataTable.addRow(['American Indian/Alaska Native', parseFloat(content.nativeAmerican)]);
    dataTable.addRow(['Other', parseFloat(content.other)]);
    var options = {
        title: 'Poor Mental Health Stats by Race/Ethnicity',
        sliceVisibilityThreshold: 0,
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('mentalhealth-piechart-race'));
    chart.draw(dataTable, options);
}
function drawObesityRegionsMap() {
    var jsonData = $.ajax({
        url: "/api/stats/obesity",
        dataType: "json",
        async: false
    }).responseText;

    var contentAsArray = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'State');
    dataTable.addColumn('number', 'Adults %');

    for (var i = 0; i < contentAsArray.length; i++) {
        dataTable.addRow([contentAsArray[i].location, parseFloat(contentAsArray[i].percentage)]);
    }

    var options = {
        region: 'US',
        resolution: 'provinces',
        backgroundColor: '#81d4fa',
        colorAxis: {colors: ['#00853f', '#e31b23']},
        datalessRegionColor: '#f8bbd0',
        enableRegionInteractivity: true,
        tooltip: {trigger: 'focus'},
        defaultColor: '#f5f5f5'
    };
    var chart = new google.visualization.GeoChart(document.getElementById('obesity-geochart-colors'));
    chart.draw(dataTable, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);

    //Default state is Ohio
    $('#obesity-currentState').text('Ohio');
    drawObesityGenderChart('Ohio');
    drawObesityRaceChart('Ohio');

    function selectHandler(e) {
        var selection = chart.getSelection();
        var state = '';
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                state = dataTable.getFormattedValue(item.row, item.column);
            } else if (item.row != null) {
                state = dataTable.getFormattedValue(item.row, 0);
            } else if (item.column != null) {
                state = dataTable.getFormattedValue(0, item.column);
            }
        }
        if (state == '') {
            state = 'nothing';
        }
        $('#obesity-stats-link').click();
        drawObesityGenderChart(state);
        drawObesityRaceChart(state);
        $('#obesity-currentState').text(state);
    }
}

function drawObesityGenderChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/obesity/gender/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Gender');
    dataTable.addColumn('number', 'Gender %');
    dataTable.addRow(['Male', parseFloat(content.male)]);
    dataTable.addRow(['Female', parseFloat(content.female)]);

    var options = {
        title: 'Obesity Stats by Gender',
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('obesity-piechart-gender'));
    chart.draw(dataTable, options);
}

function drawObesityRaceChart(state) {

    var jsonData = $.ajax({
        url: "/api/stats/obesity/race/" + state,
        dataType: "json",
        async: false
    }).responseText;

    var content = JSON.parse(jsonData);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Race');
    dataTable.addColumn('number', 'Race %');

    dataTable.addRow(['White', parseFloat(content.white)]);
    dataTable.addRow(['Black', parseFloat(content.black)]);
    dataTable.addRow(['Hispanic', parseFloat(content.hispanic)]);
    dataTable.addRow(['Asian/Native Hawaiian and Pacific Islander', parseFloat(content.asianHawPac)]);
    dataTable.addRow(['American Indian/Alaska Native', parseFloat(content.nativeAmerican)]);
    dataTable.addRow(['Other', parseFloat(content.other)]);
    dataTable.addRow(['All Adults', parseFloat(content.allAdults)]);
    var options = {
        title: 'Obesity Stats by Race/Ethnicity',
        sliceVisibilityThreshold: 0,
        is3D: true
    };
    var chart = new google.visualization.PieChart(document.getElementById('obesity-piechart-race'));
    chart.draw(dataTable, options);
}

