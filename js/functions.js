// Создает объект, в котором ключи это часы и минуты
function createsTimeArray(timeLine) {
  timeLine = timeLine.split(':');
  const arrayHoursAndMinutes = [];
  for (let i = 0; i < timeLine.length; i++) {
    const newNumber = parseInt(timeLine[i], 10);
    arrayHoursAndMinutes.push(newNumber);
  }
  return {
    hours: arrayHoursAndMinutes[0],
    minutes: arrayHoursAndMinutes[1],
  };
}

// Рассчитывает время окончания встречи
function calculateTheEndTimeMeeting(hoursStartMeeting, minutesStartMeeting, durationMeeting) {
  const meetingTheEndTime = {
    hours: 0,
    minutes: 0,
  };

  if (minutesStartMeeting + durationMeeting <= 59) {
    meetingTheEndTime.hours = hoursStartMeeting;
    meetingTheEndTime.minutes = minutesStartMeeting + durationMeeting;
  } else {
    meetingTheEndTime.hours = (hoursStartMeeting + Math.floor((minutesStartMeeting + durationMeeting) / 60));
    meetingTheEndTime.minutes = (minutesStartMeeting + durationMeeting) - (Math.floor((minutesStartMeeting + durationMeeting) / 60) * 60);
  }

  return meetingTheEndTime;
}

// Проверяет можно ли провести встречу в рабочее время
function itPossibleHoldMeeting(timeBeginning, timeTheEnd, meetingStart, durationMeeting) {
  timeBeginning = createsTimeArray(timeBeginning);
  timeTheEnd = createsTimeArray(timeTheEnd);
  meetingStart = createsTimeArray(meetingStart);

  if (timeBeginning.hours <= meetingStart.hours && timeBeginning.minutes <= meetingStart.minutes) {
    const timeTheEndMeeting = calculateTheEndTimeMeeting(meetingStart.hours, meetingStart.minutes, durationMeeting);
    if (timeTheEndMeeting.hours <= timeTheEnd.hours && timeTheEndMeeting.minutes <= timeTheEnd.minutes) {
      return true;
    }
    return false;
  }
  return false;
}
