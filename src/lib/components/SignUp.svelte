<script lang="ts">
	import Peer from "peerjs";
	import { db } from "#lib/db";
	import { generateKey } from "openpgp";

	let name: string = $state("");
	let email: string = $state("");
	let passphrase: string = $state("");
	let confirm: string = $state("");

	const signUp = async (e: MouseEvent) => {
		// Check if user already exists
		const user = await db.users.get(email);
		//If it doesn't exist create a new OpenPGP Certificate
		if (!user) {
			const date: Date = new Date();
			const { publicKey, privateKey, revocationCertificate } =
				await generateKey({
					type: "ecc",
					curve: "curve25519Legacy",
					userIDs: [{ name: name, email: email }],
					passphrase: passphrase,
					date: date,
				});
			console.log(`Created key: ${publicKey.toString()}`);
			if (navigator.storage && navigator.storage.persist) {
				navigator.storage.persist().then((persistent) => {
					if (persistent) {
						console.log(
							"Storage will not be cleared except by explicit user action",
						);
					} else {
						console.log(
							"Storage may be cleared by the UA under storage pressure.",
						);
					}
				});
			}
			//Add the new user and its Certificate to IndexedDB
			db.users.add({
				name: name,
				email: email,
				publicKey: publicKey,
				privateKeyArmored: privateKey, // Safe to store because it is encrypted
				revocationCertificate: revocationCertificate,
				createdAt: date,
			});
		}
	};
</script>

<form action="">
	<input
		type="text"
		name="name"
		placeholder="Name"
		bind:value={name}
		required
	/>
	<input
		type="email"
		name="email"
		placeholder="Email"
		bind:value={email}
		required
	/>
	<input
		type="password"
		placeholder="Passphrase"
		bind:value={passphrase}
		required
	/>
	<input
		type="password"
		placeholder="Confirm Passphrase"
		bind:value={confirm}
		required
	/>
	<button onclick={(e) => signUp(e)}>Sign Up</button>
</form>
