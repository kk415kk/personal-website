// Author: Kevin Kao
// Utility class for various functions

module.exports.util = {

  sortProjects: function(projects) {
    var sorted = [];

    // @return -1 if proj1 is later than proj2, 0 if they are equal, 
    // and 1 if proj1 is earlier than proj2
    function compare(proj1, proj2) {
      var months = {  january:  1,
                      february: 2,
                      march:    3,
                      april:    4,
                      may:      5,
                      june:     6,
                      july:     7,
                      august:   8,
                      september:9,
                      october:  10,
                      november: 11,
                      december: 12 };

      if (proj1.end_date == 'Present') {
        return -1;
      } else if (proj2.end_date == 'Present') {
        return 1;
      } else {
        var month1 = proj1.end_date.split(" ")[0];
        var month2 = proj2.end_date.split(" ")[0];
        var year1 = proj1.end_date.split(" ")[1];
        var year2 = proj2.end_date.split(" ")[1];

        if (year1 > year2) {
          return -1;
        } else if (year1 < year2) {
          return 1;
        } else if (months[month1] > months[month2]) {
          return -1;
        } else if (months[month1] < months[month2]) {
          return 1;
        } else {
          return 1;
        }
      }
    }

    var i;
    var j;
    for (i = 0; i < projects.length; i++) {
      for (j = 0; j < projects.length; j++) {
        if (compare(projects[i], projects[j]) < 0) {
          var temp = projects[i];
          projects[i] = projects[j];
          projects[j] = temp;
        }
      }
    }
    return projects;
  }
}