let logged // implicit any is allowed for variables because they're trackable by ts

function sendAnalytics(data: string) {
  console.log(data)
}

sendAnalytics('The data')