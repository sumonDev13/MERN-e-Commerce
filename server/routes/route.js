import express from 'express';
import { userSignUp ,userLogin} from '../controller/user-controller.js';
import { getProducts,createProduct } from '../controller/product-controller.js';




const router = express.Router();

router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.get('/products',getProducts);
router.post('/createProduct',createProduct);

export default router;