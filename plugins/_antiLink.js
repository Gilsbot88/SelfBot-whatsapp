let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  if (m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink && isBotAdmin && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text?.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikick
    this.reply(m.chat, `*Link Grup Terdeteksi!*\n\nKetik *.off antilink* untuk mematikan fitur ini`, m)
    .then(_ => {
       conn.groupRemove(m.chat, [m.sender])
  })
  }
  return true
}

module.exports = handler
