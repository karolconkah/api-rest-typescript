import { Router } from 'express';
import { createCidade, createCidadeValidation } from '../controllers';
import { getAllCidades, getAllCidadesValidation } from '../controllers';
import { getByIdCidades, getByIdValidationCidades } from '../controllers';
import { deleteByIdCidades, deleteByIdValidationCidades} from '../controllers';
import { updateByIdCidades, updateByIdValidationCidades} from '../controllers'

import { createPessoas, createPessoasValidation } from '../controllers';
import { getAllPessoas, getAllPessoasValidation} from '../controllers';
import { getByIdPessoas, getByIdValidationPessoas } from '../controllers';
import { deleteByIdPessoas, deleteByIdValidationPessoas} from '../controllers';
import { updateByIdPessoas, updateByIdValidationPessoas} from '../controllers';
import { signInUsuarios, signInValidationUsuarios } from '../controllers';
import { signUpUsuarios, signUpValidationUsuarios } from '../controllers';

import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

//console.log('DEBUG typeof create =', typeof createCidade);
//console.log('DEBUG typeof createValidation =', typeof createCidadeValidation);
//console.log('DEBUG typeof create =', typeof getAllCidades);
//console.log('DEBUG typeof createValidation =', typeof getAllCidadesValidation);
//console.log('DEBUG typeof createValidation =', typeof getByIdCidades);
//console.log('DEBUG typeof createValidation =', typeof getByIdValidationCidades);
//console.log('DEBUG typeof createValidation =', typeof deleteByIdCidades);
//console.log('DEBUG typeof createValidation =', typeof deleteByIdValidationCidades);
//console.log('DEBUG typeof createValidation =', typeof updateByIdCidades);
//console.log('DEBUG typeof createValidation =', typeof updateByIdValidationCidades);


router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.get('/cidades', ensureAuthenticated, getAllCidadesValidation, getAllCidades);
router.post('/cidades', ensureAuthenticated, createCidadeValidation, createCidade);
router.get('/cidades/:id', ensureAuthenticated, getByIdValidationCidades, getByIdCidades);
router.put('/cidades/:id', ensureAuthenticated, updateByIdValidationCidades,updateByIdCidades);
router.delete('/cidades/:id', ensureAuthenticated, deleteByIdValidationCidades, deleteByIdCidades);

router.get('/pessoas', ensureAuthenticated, getAllPessoasValidation, getAllPessoas);
router.post('/pessoas', ensureAuthenticated, createPessoasValidation, createPessoas);
router.get('/pessoas/:id', ensureAuthenticated, getByIdValidationPessoas, getByIdPessoas);
router.put('/pessoas/:id', ensureAuthenticated, updateByIdValidationPessoas, updateByIdPessoas);
router.delete('/pessoas/:id', ensureAuthenticated, deleteByIdValidationPessoas, deleteByIdPessoas);

router.post('/entrar', signInValidationUsuarios, signInUsuarios);
router.post('/cadastrar', signUpValidationUsuarios, signUpUsuarios);

export { router };
