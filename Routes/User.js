const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {User} = require('../models')

router.post('/', async (req, res) => {
    try {
      const { Username, Password } = req.body;
  
      const existingUser = await User.findOne({ where: { Username } });
  
      if (existingUser) {
        return res.status(201).json({ error: "Usuário já existente" });
      }
  
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      await User.create({
        Username,
        Password: hashedPassword,
      });
  
      res.status(200).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });


router.post('/login', async (req,res) =>{
    const {Username, Password} = req.body
    const user = await User.findOne({where: {Username: Username}})

    if (!user) {
        return res.json({error: "Usuário não existe"})
    }

    bcrypt.compare(Password, user.Password).then((match) =>{
        if (!match) {
            return res.json({ error: "Usuário com a senha não combinam"})
        }

        

        res.json("Usuário logado!")
    })
})

router.post('/user/login', async (req, res) => {

    const user = await User.findOne({ where: { username: req.body.Username } });
  
    if (!user || !bcrypt.compareSync(req.body.Password, user.Password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.status(200).json({ id: user.id, username: user.Username });
  });

router.get('/login', async (req,res) =>{

    const users = await User.findAll()
    res.status(200).json(users)
})

module.exports = router