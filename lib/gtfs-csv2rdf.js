var csv = require('csv');
var unzip = require('unzip');
var StopsTransformer = require('./StopsTransformer.js');
var AgenciesTransformer = require('./AgenciesTransformer.js');
var RoutesTransformer = require('./RoutesTransformer.js');
var TripsTransformer = require('./TripsTransformer.js');
var StopTimesTransformer = require('./StopTimesTransformer.js');
function Mapper(zipstream, feedname, outstream) {
  zipstream.pipe(unzip.Parse())
    .on('entry', function (entry) {
      var fileName = entry.path;
      var type = entry.type; // 'Directory' or 'File'
      var size = entry.size;

      if (fileName === "stops.txt") {
        console.error("Transforming Stops");
        var transform = new StopsTransformer(feedname);
        entry.pipe(csv.parse({'columns' : true }))
          .pipe(transform)
          .pipe(outstream);
      } else if (fileName === "agency.txt") {
        console.error("Transforming Agencies");
        var transform = new AgenciesTransformer(feedname);
        entry.pipe(csv.parse({'columns' : true }))
          .pipe(transform)
          .pipe(outstream);
      } else if (fileName === "routes.txt") {
        console.error("Transforming Routes");
        var transform = new RoutesTransformer(feedname);
        entry.pipe(csv.parse({'columns' : true }))
          .pipe(transform)
          .pipe(outstream);
      } else if (fileName === "trips.txt") {
        console.error("Transforming Trips");
        var transform = new TripsTransformer(feedname);
        entry.pipe(csv.parse({'columns' : true }))
          .pipe(transform)
          .pipe(outstream);
      } else if (fileName === "stop_times.txt") {
        console.error("Transforming Stop Times");
        var transform = new StopTimesTransformer(feedname);
        entry.pipe(csv.parse({'columns' : true }))
          .pipe(transform)
          .pipe(outstream);
      }
      // else if (fileName === "calendar.txt") {
      //   console.error("Transforming Calendar");
      //   var transform = new CalendarTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // } else if (fileName === "calendar_dates.txt") {
      //   console.error("Transforming CalendarDates");
      //   var transform = new CalendarDatesTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // } else if (fileName === "fare_attributes.txt") {
      //   console.error("Transforming FareAttributes");
      //   var transform = new FareAttributesTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // } else if (fileName === "fare_rules.txt") {
      //   console.error("Transforming FareRules");
      //   var transform = new FareRulesTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // } else if (fileName === "shapes.txt") {
      //   console.error("Transforming Shapes and Shape Segments");
      //   var transform = new ShapesTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // } else if (fileName === "frequencies.txt") {
      //   console.error("Transforming Frequencies");
      //   var transform = new FrequenciesTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // } else if (fileName === "transfers.txt") {
      //   console.error("Transforming Transfers");
      //   var transform = new TransfersTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      // }else if (fileName === "feed_info.txt") {
      //   console.error("Transforming Feed info");
      //   var transform = new FeedInfoTransformer(feedname);
      //   entry.pipe(csv.parse({'columns' : true }))
      //     .pipe(transform)
      //     .pipe(outstream);
      //}
      else {
        console.error("draining " + fileName);
        entry.autodrain();
      }
    });
};

module.exports = Mapper;