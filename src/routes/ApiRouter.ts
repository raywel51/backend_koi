import express from 'express';

const router = express.Router();

import {RegisterVisitorController} from '../controller/api/visitor/RegisterVisitorController';
import {QrCodeController} from "../controller/QrCodeController";
import {ApproveController} from "../controller/api/visitor/ApproveController";
import {QRCodeWebController} from "../controller/webview/QRCodeWebController";
import {UserRegisterController} from "../controller/api/users/CredentialController/UserRegisterController";
import {UserLoginController} from "../controller/api/users/CredentialController/UserLoginController";
import {CheckGuestController} from "../controller/api/visitor/CheckGuestController";
import {HistoryQrCodeController} from "../controller/HistoryQrCodeController";
import {ContactListController} from "../controller/api/ValueListController/ContactListController";
import {LocationListController} from "../controller/api/ValueListController/LocationListController";
import {BasicController} from "../controller/BasicController";
import {ApproveLinkController} from "../controller/api/visitor/ApproveLinkController";
import {LoginWebController} from "../controller/webview/LoginWebController";
import {HistoryWebController} from "../controller/webview/HistoryWebController";
import {errPage} from "../controller/ErrPage";
import {MemberRegisterPages} from "../controller/webview/MemberRegisterPages";
import {CheckInViewController} from "../controller/webview/CheckInViewController";
import { RegisterCheckInController } from '../controller/api/visitor/RegisterCheckInController';
import { LocalVisitorListController } from '../controller/api/ValueListController/LocalVisotorListController';
import {RemoveQrCodeController} from "../controller/api/visitor/RemoveQrCodeController";
import {EditQrCodeController} from "../controller/api/visitor/EditQrCodeController";

router.get('/', BasicController);
router.get('/login', LoginWebController);
router.get('/main', HistoryWebController);
router.get('/check-in', MemberRegisterPages);
router.get('/check-guest', CheckInViewController);

router.get('/local/reigster-local', LocalVisitorListController);

router.get('/view/:key', QRCodeWebController);
router.get('/view/approve/:key', ApproveLinkController);

router.post('/api/users/login', UserLoginController)
router.post('/api/users/register', UserRegisterController)

router.get('/api/v1/qrcode/:key', QrCodeController);

router.get('/api/v1/approve/:key', ApproveController);

router.get('/api/v1/history', HistoryQrCodeController);
router.delete('/api/v1/history/:key', RemoveQrCodeController);
router.patch('/api/v1/history', EditQrCodeController);

router.get('/api/v1/list/contact', ContactListController)
router.get('/api/v1/list/location', LocationListController)

router.post('/api/v1/visitor/register', RegisterVisitorController);
router.post('/api/v1/visitor/check-in', RegisterCheckInController);
router.post('/api/v1/visitor/check-guest', CheckGuestController);

router.get('*', errPage);

export default router;
