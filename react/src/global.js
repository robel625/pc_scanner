import { create } from 'zustand'
import {socket_URL}  from './utils/config'






const useGlobal = create((set, get) => ({

   
    
    socket: null,

	socketConnect: async () => {

	await new Promise(resolve => setTimeout(resolve, 4000));

    const access_token  = localStorage.getItem("access_token")

	console.log("token wswswswsws" , access_token)

    const url = `${socket_URL}/chat/?token=${access_token}`

		const socket = new WebSocket(url)
		socket.onopen = () => {
			console.log('socket.onopen')
		}

		socket.onmessage = (event) => {
			// Convert data to javascript object
			const parsed = JSON.parse(event.data)

			// Debug log formatted  data
			console.log('onmessage:', parsed)

			const responses = {
				'barcode': responsebarcode
			}
			const resp = responses[parsed.source]
			if (!resp) {
				console.log('parsed.source "' + parsed.source + '" not found')
				return
			}
			// Call response function
			resp(set, get, parsed.data)
		}
		socket.onerror = (e) => {
			console.log('socket.onerror', e.message)
		}
		socket.onclose = () => {
			console.log('socket.onclose')
		}
		set((state) => ({
			socket: socket
		}))
	},

	socketClose: () => {
		const socket =  get().socket
		if (socket) {
			socket.close()
		}
		set((state) => ({
			socket: null
		}))
	},



}))

export default useGlobal




function responsebarcode(set, get, data) {
	set((state) => ({
		barcodeValue: data
	}))
	console.log("barcode",data)
}