let limit = 30
let yts = require('yt-search')
const { servers, yta, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, command, text, isPrems, isOwner }) => {
  if (!text) throw 'Cari apa?'
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Video/Audio Tidak ditemukan'
  let { dl_link, thumb, title, filesize, filesizeF} = await (/2$/.test(command) ? ytv : yta)(vid.url, 'id4')
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*Judul:* ${title}
*Ukuran:* ${filesizeF}
*Sumber:* ${vid.url}
*${isLimit ? 'Pakai ': ''}Link:* ${dl_link}
`.trim(), m)
  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp' + (3 + /2$/.test(command)), `
*Judul:* ${title}
*Ukuran:* ${filesizeF}
*Sumber:* ${vid.url}
`.trim(), m)
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play2?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler