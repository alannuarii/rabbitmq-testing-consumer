const amqp = require('amqplib')
require("dotenv").config();

const consumeMessage = async () => {
    const rabbitmqUrl = `amqp://${process.env.USER}:${process.env.PASSWORD}@${process.env.URL}/`

    try {
        // Membuat koneksi ke RabbitMQ server
        const connection = await amqp.connect(rabbitmqUrl)

        // Membuat channel
        const channel = await connection.createChannel()

        // Mengonsumsi pesan dari queue
        channel.consume('report', (message) => {
            console.log(message.content.toString())
        }, { noAck: true })

        // Menampilkan informasi bahwa aplikasi telah terhubung saat dijalankan
        console.log('Aplikasi berhasil terhubung ke RabbitMQ server.')
    } catch (error) {
        console.error('Error:', error)
    }
}

consumeMessage()