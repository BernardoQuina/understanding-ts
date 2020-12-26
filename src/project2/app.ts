import axios from 'axios'

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[]
  status: 'OK' | 'ZERO_RESULTS'
}

const form = document.querySelector('form')!

const addressInput = document.getElementById('address')! as HTMLInputElement

async function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  try {
    // Send input data to google API
    const response = await axios.get<GoogleGeocodingResponse>(`
      https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${process.env.GOOGLE_API_KEY}
    `)

    if (response.data.status !== 'OK') {
      throw new Error('Could not fetch location')
    }

    const coordinates = response.data.results[0].geometry.location
  } catch (err) {
    alert(err.message)
    console.log(err)
  }
}

form.addEventListener('submit', searchAddressHandler)
