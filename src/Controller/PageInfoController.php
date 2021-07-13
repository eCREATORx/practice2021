<?php

namespace App\Controller;

use App\Service\BoxService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PageInfoController extends AbstractController
{
    private BoxService $boxService;

    public function __construct(BoxService $boxService)
    {
        $this->boxService = $boxService;
    }

    public function getUserBoxes(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        return new JsonResponse($this->boxService->getUserBoxes($userId));
    }

}