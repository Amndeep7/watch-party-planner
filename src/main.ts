import axios from 'axios';
import dotenv from 'dotenv';
import {REST} from '@discordjs/rest';
import {Client} from 'discord.js';
import {GatewayIntentBits, Routes} from 'discord-api-types/v10';

dotenv.config();

const res = await axios({
	method: 'post',
	url: 'https://api.strawpoll.com/v3/polls',
	data: {
		"title": "test",
		"media": null,
		"poll_options": [
			{ type: "text", "value": "foo"},
			{ type: "text", "value": "bar"}
		],
		poll_config: {
			is_private: true,
			vote_type: "default",
			allow_comments: false,
			allow_indeterminate: false,
			allow_other_option: false,
			custom_design_colors: null,
			deadline_at: null,
			duplication_checking: "none",
			allow_vpn_voters: true,
			edit_vote_permissions: "nobody",
			force_appearance: null,
			hide_participants: false,
			is_multiple_choice: true,
			multiple_choice_min: 0,
			multiple_choice_max: 0,
			number_of_winners: 1,
			randomize_options: true,
			require_voter_names: false,
			results_visibility: "always",
			user_custom_design: false
		},
		poll_meta: {
			"description": null
		},
		type: "multiple_choice"
	},
	headers: {
		"Content-Type": "application/json",
		"X-API-KEY": `${process.env.STRAWPOLL_API_KEY}`
	}
});

console.log(res.data);

if (!process.env.DISCORD_BOT_TOKEN || !process.env.DISCORD_CLIENT_ID) {
	throw new Error('Missing either one of the discord bot token or client id');
}

const commands = [{name: 'ping', description: 'will pong'}];
const rest = new REST({version: '10'}).setToken(process.env.DISCORD_BOT_TOKEN);
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.on('ready', async () => {
	console.log(`Logged in as ${client?.user?.tag}`);
	console.log('Refreshing slash commands');
	try {
		for(const guildId of client.guilds.cache.keys()) {
			await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID || '', guildId), {body: commands});
		}
	} catch (error) {
		console.error('Refreshing slash command failed', error);
	}
	console.log('Refresh completed');
});

client.on('interactionCreate', async (interaction) => {
	if(!(interaction.isCommand())) {
		return;
	}

	if(interaction.commandName === 'ping') {
		console.log('Got ping');
		await interaction.reply('pong');
		console.log('Did pong');
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
