let handler = function (m) {
  // 
  this.sendContact(m.chat, '595991358411', '👑Carlos Duarte👑', m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
