<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class MainController
{
    /**
     * Endpoint: hello
     * 
     * Description: Odczytuje dane z pliku JSON znajdującego się w katalogu public/data i zwraca je jako odpowiedź w formacie JSON.
     * 
     * @return JsonResponse
     */
    public function hello(): JsonResponse
    {
        $filePath = __DIR__ . '/../../public/data/events.json';

        if (!file_exists($filePath)) {
            return new JsonResponse(['error' => 'File not found'], 404);
        }

        $jsonData = file_get_contents($filePath);
        $data = json_decode($jsonData, true);

        return new JsonResponse($data);
    }

    /**
     * Endpoint: action
     * 
     * Description: Obsługuje różne typy zdarzeń, które są przesyłane w żądaniu HTTP POST. Na podstawie eventType wykonuje odpowiednie akcje.
     * 
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function action(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return new JsonResponse(['error' => 'Niepoprawny JSON'], 400);
        }

        foreach ($data as $key => $value) {
            if (empty($value)) {
                return new JsonResponse(['error' => 'Wartość elementu "' . $key . '" jest pusta'], 400);
            }
        }

        if (!isset($data['eventType'])) {
            return new JsonResponse(['error' => 'Brakuje typu zdarzenia'], 400);
        }

        $eventType = $data['eventType'];

        switch ($eventType) {
            case 'deviceMalfunction':
                $message = 'Zalogowano zdarzenie i wysłano e-mail.';
                break;

            case 'temperatureExceeded':
                $message = 'Zalogowano zdarzenie i wysłano żądanie REST.';
                break;

            case 'doorUnlocked':
                $message = 'Zalogowano zdarzenie i wysłano SMS.';
                break;

            default:
                return new JsonResponse(['error' => 'Niepoprawny typ zdarzenia'], 400);
        }

        return new JsonResponse(['message' => $message], 200);
    }
}