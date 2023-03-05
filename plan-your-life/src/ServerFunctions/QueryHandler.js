
module.exports.processquery = processQuery;

var Kwi = require('./KeyWordIdentifier');
var Calendar = require('./calendar');
var TaskHandler = require('./tasks');
//var CalendarEventRemove = require('../../calendar/calendarDeleteEvent');
//var CalendarListIds = require('../../calendar/calendarListIds');

//var Task = require('../../tasks/createTaskList');

function processQuery(query, res){
    var response = Kwi.KWI(query.text);
    console.log(response.where);
    console.log(response.time);
    //var firstTenEvents = Calendar;
    if(response.time instanceof Date) {
      var startTime = response.time;
      var endTime = response.time;
    }
    else {
      var formattedDate = formatDateForGoogle(response.time);
      var startTime = formattedDate;
      var endTime = formattedDate;
    }
    //var formattedDate = formatDateForGoogle(response.time);
    //console.log(formattedDate);
    var location = response.where;
    var summary = response.event;
    var eventObject = {'summary': summary,
    'location': location,
    'description': 'Event added by PlanYourLife',
    'start': {'dateTime': startTime, 'timeZone': 'America/New_York'},
    'end': {'dateTime': endTime, 'timeZone': 'America/New_York'}
    };

    var taskObject = {'title' : response.item}
    var listObject = {'title' : response.destination}
    if(response.add == 'true') {
      if(response.item != null) {
        TaskHandler.newTask(taskObject, listObject);
      }
      else {
        console.log('Adding event ' + eventObject);
        Calendar.createEvent(eventObject);
        res.send({'message':'Event successfully added.'});
      }
    }
    else if (response.remove == 'true') {
      console.log('Removing event ' + eventObject);
      Calendar.deleteEvent(eventObject);
      res.send({'message':'Event successfully removed.'});
    }
    else if (response.download == 'true') {
      
    }
    else if (response.remind == 'true') {
      console.log('Adding event ' + eventObject);
      Calendar.createEvent(eventObject);
      res.send({'message':'Event successfully added.'});
    }
    //JSON.parse(response);
    //console.log(frontendResponse);
    
    /*var googleresponse = CalendarEventInsert.execute();
    var googleTaskResponse = Task.execute();
    res.send(frontendResponse);*/
  }

  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  }

  function formatDateForGoogle(date){
    var fullDateForGoogle = new Date(date);
    return fullDateForGoogle;
    //2015-05-28T17:00:00-07:00
  }

 