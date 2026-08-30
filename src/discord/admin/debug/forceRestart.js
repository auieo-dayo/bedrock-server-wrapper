import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";



export default async function forceRestart(interaction) {
    await interaction.deferReply()

    const embed = new EmbedBuilder()
        .setTimestamp(new Date())
        .setTitle("強制再起動しますか？")
        .setDescription(`最終手段として使用してください。\nワールドデータその他諸々が吹っ飛ぶ可能性があります。`);

    const button = new ButtonBuilder()
        .setCustomId(`forceRestart_${Date.now() + 1000*60*5}_${interaction.user.id}`)
        .setLabel("強制再起動")
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(button);
    await interaction.editReply({embeds:[embed],components:[row]})
}