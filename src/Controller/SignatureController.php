<?php

namespace App\Controller;

use App\Service\UserBoxSignatureService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SignatureController extends AbstractController
{
    private UserBoxSignatureService $userBoxSignatureService;

    public function __construct(UserBoxSignatureService $userBoxSignatureService)
    {
        $this->userBoxSignatureService = $userBoxSignatureService;
    }


    public function saveSignature(Request $request): JsonResponse
    {
        $boxId = $request->get('box_id');
        $signature = $request->get('signature');
        $userId = $request->get('user_id');

        $this->userBoxSignatureService->saveSignature($boxId, $signature, $userId);
        return new JsonResponse(true);
    }
}