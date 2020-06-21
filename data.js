import axios from 'axios'

export const list = [
    
   {
       address: 'Austin, TX',
       title: 'Currently Recruiting Monetary Beneficiary Organizations',
       squareLink:'',
       type: 'monetaryDonation'
   },
   {
       address: '4800 Manor Rd Building A, Austin, TX 78723',
       title: "The SAFE Children's Shelter",
       squareLink: 'https://checkout.square.site/pay/d1726ad6f6fa49e89c7ae7226c20a786',
       note: 'They have a good amount of masks/gloves at the moment but are open to accepting more',
       type: 'masks/gloves'
   },
   {
       address: '908 E Cesar Chavez St, Austin, TX 78702',
       title: 'Austin Baptist Chapel -- Angel House Soup Kitchen',
       squareLink: 'https://checkout.square.site/pay/c59b5ac75a2a413c8924bd9f62980bf8',
       type: 'masks/gloves'
   },
   {
       address: '1611 Headway Cir building 2, Austin, TX 78754',
       title: 'Foundation For The Homeless',
       squareLink: 'https://checkout.square.site/pay/fd4bc1c8fb684b998057fc886acfbc53',
       type: 'masks/gloves'
   },
   {
       address: '4613 Tannehill Ln bldg 3, Austin, TX 78721',
       title: 'Austin Shelter for Women and Children, The Salvation Army',
       squareLink: 'https://checkout.square.site/pay/c8ac46d48e3f4157b1c5d1630eb798c9',
       type: 'masks/gloves'
   },
   {
       address: '501 E 8th St, Austin, TX 78701',
       title: 'The Salvation Army Center',
       squareLink: 'https://checkout.square.site/pay/1249bdb9de8e407cb9e525b7bbdee3f3',
       type: 'masks/gloves'
   }
   /* 
   {
        address: '6500 Metropolis Dr, Austin, TX 78744',
        title: 'Central Texas Food Bank',
        squareLink: 'https://checkout.square.site/pay/75f5f3f43fd142839fb1b2acf3d30e04',
        type: 'monetaryDonation'
   }
   */

]

export async function getCoordinates(obj) {
    const address = obj.address;
    const key = 'AIzaSyDLC3mud_dvTIR6fpIc-PAJ85XzKI1HT9g'
    const results = await axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
    obj.position = results.data.results[0].geometry.location
}