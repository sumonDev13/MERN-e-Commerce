import express from 'express';
import { userSignUp ,userLogin} from '../controller/user-controller.js';
import { getProducts,createProduct,updateProduct } from '../controller/product-controller.js';




const router = express.Router();

router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.get('/products',getProducts);
router.post('/createProduct',createProduct);
router.put('/updateProduct/:id',updateProduct);

export default router;