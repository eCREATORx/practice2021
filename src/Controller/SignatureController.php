<?php

namespace App\Controller;

use App\Service\UserBoxSignatureService;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SignatureController extends AbstractController
{
    private UserBoxSignatureService $userBoxSignatureService;

    public function __construct(UserBoxSignatureService $userBoxSignatureService)
    {
        $this->userBoxSignatureService = $userBoxSignatureService;
    }

    public function getSignature(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $boxId = $request->get('box_id');
        return new JsonResponse($this->userBoxSignatureService->getSignature($userId, $boxId));
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function saveSignature(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $boxId = $request->get('box_id');
        $signature = $request->getContent();

        $this->userBoxSignatureService->saveSignature($userId, $boxId, $signature);
        return new JsonResponse(true);
    }
}