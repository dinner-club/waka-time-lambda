const formatAttachment = ({ 
  rank,
  user,
  running_total: {
    languages,
    human_readable_daily_average: dailyAvg,
    human_readable_total: total
  },
}) => ({
  color: '#48848e',
  title: `${rank}) ${user.display_name}`,
  thumb_url: user.photo,
  fields: [
    {
      title: "How Much Did They Code?",
      value: `About ${dailyAvg} daily, and ${total} total! :wat:`
    },
    {
      title: "What Did They Code In?",
      value: languages.join(', ')
    }
  ]
})


const formatMessage = ({ data }) => ({
  text: ":rotating_light: *_WAKA RESULTS ARE IN_* :rotating_light:",
  attachments: data.map(formatAttachment)
})

module.exports = formatMessage
