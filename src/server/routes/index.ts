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
import { updateByIdPessoas, updateByIdValidationPessoas} from '../controllers'

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

router.get('/cidades', getAllCidadesValidation, getAllCidades);
router.post('/cidades', createCidadeValidation, createCidade);
router.get('/cidades/:id', getByIdValidationCidades, getByIdCidades);
router.put('/cidades/:id', updateByIdValidationCidades,updateByIdCidades);
router.delete('/cidades/:id', deleteByIdValidationCidades, deleteByIdCidades);

router.get('/pessoas', getAllPessoasValidation, getAllPessoas);
router.post('/pessoas', createPessoasValidation, createPessoas);
router.get('/pessoas/:id', getByIdValidationPessoas, getByIdPessoas);
router.put('/pessoas/:id', updateByIdValidationPessoas, updateByIdPessoas);
router.delete('/pessoas/:id', deleteByIdValidationPessoas, deleteByIdPessoas);

export { router };
