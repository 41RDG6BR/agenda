const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;
    
    await this.userExists();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    
    try {
      this.user = await LoginModel.create(this.body)
    } catch(e) {
      console.log(e);
    }
    // const user = await LoginModel.create(this.body)
    // return user;
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email })
    if(user) this.errors.push('Usúario já existe.')
  }
  
  valida() {
    this.cleanUp();
    //Validacao
    //O e-mail precisa ser valido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
    // A senha precisa ter entre 6 e 26 caracteres
    if(this.body.password.length < 6 || this.body.password.length >26) {
      this.errors.push('A senha precisa ter entre 6 e 26 caracteres.')
    }
  }

  cleanUp(){
    for(const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;
