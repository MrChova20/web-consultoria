import express from 'express';
import { UploadedFile } from 'express-fileupload';
import multer from 'multer';
import { verifyToken } from '../utils/jwtAuth'; // subes un nivel más

const router = express.Router();
export const airbnbRouter = router;

const upload = multer({ dest: 'uploads/' }); // Puedes configurar Google Drive directamente más adelante

router.post('/formulario/:id', verifyToken, upload.single('documento'), async (req, res) => {
  const { nombre } = req.body;
  const file = req.file;
  const reservaId = req.params.id;

  try {
    // TODO: subir a Google Drive y enviar email (esto lo hacemos luego)
    console.log({ reservaId, nombre, file });

    res.status(200).json({ message: 'Formulario recibido' });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el formulario' });
  }
});
