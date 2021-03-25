const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.user = null;
  }

  register() {
    this.valida();
  }
  
  valida() {
    this.cleanUp();
    //Validacao
    //O e-mail precisa ser valido
    // A senha precisa ter entre 6 e 26 caracteres
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
