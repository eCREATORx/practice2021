<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ImageUploaderController extends AbstractController
{
    public function uploadImage(Request $request): JsonResponse
    {
        $file = $request->files->get("image");
        $filename = $file->getClientOriginalName();
        $destination = $this->getParameter('kernel.project_dir') . '/public/Data';
        $file->move($destination, $filename);

        return new JsonResponse(true);
    }
}