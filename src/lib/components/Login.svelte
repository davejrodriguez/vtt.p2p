<script lang="ts">
	import Peer from "peerjs";
	import { db } from "#lib/db";
	import { Style, Avatar } from "@dicebear/core";
	import lorelei from "@dicebear/styles/lorelei.json" with { type: "json" };

	const style = new Style(lorelei);
	const avatar = new Avatar(style, {
		seed: "Perdle",
		// ... other options
	});

	let username = $state("");
	let password = $state("");

	let peer: Peer;
	let peerId: string = $state("");
	let connected = $state(false);

	const login = async (u: string, p: string) => {
		//get existing user if possible
		const user = await db.users.where("username").equals(u).first();
		// if (user) {
		// 	if (user.pass === p) {
		// 		console.log('login success');
		// 	}
		// } else {
		// 	console.log('login failed');
		// }
	};

	const join = async () => {
		// Create a peer
		peer = new Peer();

		peer.on("open", (id) => {
			peerId = id;
			console.log("My peer ID:", id);
		});

		// Connect to a remote peer
		const conn = peer.connect("remote-peer-id");

		conn.on("open", () => {
			conn.send("Hello, peer! 👋");
		});

		// Receive data
		peer.on("connection", (conn) => {
			conn.on("data", (data) => {
				console.log("Received:", data);
			});
		});
	};
</script>

<form>
	<input type="text" placeholder="Username" bind:value={username} />
	<input type="password" placeholder="Password" bind:value={password} />
	<button onclick={() => login(username, password)}>Login</button>
</form>
<button onclick={() => join()}>Start Node</button>
{#if connected}
	<p>{peerId}</p>
	<input />
{/if}
<img src={avatar.toDataUri()} alt="Avatar" width="100px" />
