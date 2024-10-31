$(document).ready(function () {
    // Replace with your hosted JSON URL
    const scheduleUrl = 'https://api.npoint.io/e6010e69f8796e373a44'


    // When the "Show Schedule" button is clicked
    $('#submitDay').on('click', function () {
        const selectedDay = $('#dayInput').val().toUpperCase()

        if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(selectedDay)) {
            alert('Please enter a valid day (A-G)')
            return
        }

        $.ajax({
            url: scheduleUrl,
            method: 'GET',
            success: function (data) {
                const schedule = data.schedule
                const daySchedule = schedule.filter(item =>
                    item.days.includes(selectedDay)
                )

                $('#scheduleList').empty()

                if (daySchedule.length === 0) {
                    $('#scheduleList').append(
                        '<tr><td colspan="5">No classes today.</td></tr>'
                    )
                } else {
                    daySchedule.forEach(classItem => {
                        const period = classItem.period

                        $('#scheduleList').append(`
                              <tr>
                                  <td>${period}</td>
                                  <td>${classItem.class}</td>
                                  <td>${classItem.teacher}</td>
                                  <td>${classItem.room}</td>
                              </tr>
                          `)
                    })
                }
            },
            error: function () {
                alert('Error loading schedule. Please check your JSON file URL.')
            }
        })
    })
})