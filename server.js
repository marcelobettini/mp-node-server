import express from 'express'
import cors from 'cors'
import { MercadoPagoConfig, Preference } from 'mercadopago'
const client = new MercadoPagoConfig({
    accessToken: "APP_USR-7359176482283912-101814-c6fed97918196bd1e36d717c60afaeef-85941293",

})

const app = express()
const PORT = 3000
app.use(cors('*'))
app.use(express.json())
app.get('/', (req, res) => res.send('Server para pagos online con Mercado Pago'))
app.post('/create-preference', async (req, res) => {
    console.log(req.body)
    const { title, quantity, unit_price } = req.body
    try {
        const body = {
            items: [
                {
                    title: title,
                    quantity: quantity,
                    unit_price: unit_price,
                    currency_id: 'ARS'
                }
            ],
            // back_urls: {

            //     success: "https://localhost:3000/success",
            //     failure: "https://localhost:3000/failure",
            //     pending: "https://localhost:3000/pending",
            // },
            // auto_return: "approved" //después del pago y luego de unos segundos, retorna al cliente al sitio anterior al proceso de pago
        }
        const preference = new Preference(client)
        const result = await preference.create({ body })
        console.log('preference result en backend:', result)
        res.json({ id: result.id })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error al crear el pago 😡' })
    }
})

app.listen(PORT, (err) => {
    err ? console.log("Error al iniciar el servidor") : console.log(`Servidor corre en http://127.0.0.1:${PORT}`)
})
