import express from 'express';

const router = express.Router();

import {RegisterVisitorController} from '../controller/visitor/RegisterVisitorController';
import {QrCodeController} from "../controller/QrCodeController";
import {ApproveController} from "../controller/visitor/ApproveController";
import {QRCodeWebController} from "../controller/webview/QRCodeWebController";
import {UserRegisterController} from "../controller/users/CredentialController/UserRegisterController";
import {UserLoginController} from "../controller/users/CredentialController/UserLoginController";
import {CheckGuestController} from "../controller/visitor/CheckGuestController";
import {HistoryQrCodeController} from "../controller/HistoryQrCodeController";
import {ContactListController} from "../controller/ValueListController/ContactListController";
import {LocationListController} from "../controller/ValueListController/LocationListController";
import {BasicController} from "../controller/BasicController";
import {ApproveLinkController} from "../controller/visitor/ApproveLinkController";
import {LoginWebController} from "../controller/webview/LoginWebController";
import {HistoryWebController} from "../controller/webview/HistoryWebController";
import {errPage} from "../controller/ErrPage";

router.get('/', BasicController);
router.get('/login', LoginWebController);
router.get('/main', HistoryWebController);

router.get('/view/:key', QRCodeWebController);
router.get('/view/approve/:key', ApproveLinkController);

router.post('/users/login' , UserLoginController)
router.post('/users/register' , UserRegisterController)

router.get('/v1/qrcode/:key', QrCodeController);

router.get('/v1/approve/:key', ApproveController);

router.get('/v1/history', HistoryQrCodeController);

router.get('/v1/list/contact' , ContactListController)
router.get('/v1/list/location' , LocationListController)

router.post('/v1/visitor/register', RegisterVisitorController);
router.post('/v1/visitor/check-guest', CheckGuestController);

router.get('*', errPage);

export default router;
