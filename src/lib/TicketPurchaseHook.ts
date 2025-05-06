"use client";

import { useCallback, useState } from "react";
import { ScreeningNormalized, Seat } from "./types";
import { useAppData } from "@/contexts/AppDataContext";
import { useAuth } from "@/contexts/AuthContext";

function useTicketPurchase() {
  // State management with safer initializers
  const [selectedScreening, setSelectedScreening] =
    useState<ScreeningNormalized | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(0);
  const [purchasedSeats, setPurchasedSeats] = useState<Seat[]>([]);
  const [showTicketQuantityModal, setShowTicketQuantityModal] =
    useState<boolean>(false);
  const [showSeatSelectionModal, setShowSeatSelectionModal] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const { refreshData } = useAppData();
  const { user, refreshUser } = useAuth();

  // Use useCallback to memoize handler functions
  const handleScreeningSelect = useCallback(
    (screening: ScreeningNormalized) => {
      if (screening) {
        setSelectedScreening(screening);
        setShowTicketQuantityModal(true);
      }
    },
    []
  );

  const handleQuantityContinue = useCallback((quantity: number) => {
    setTicketQuantity(quantity);
    setShowTicketQuantityModal(false);
    setShowSeatSelectionModal(true);
  }, []);

  const handlePurchase = useCallback(
    async (seats: Seat[]) => {
      if (!selectedScreening || !seats || seats.length === 0) return;

      setIsPurchasing(true);
      setPurchaseError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setPurchaseError("You must be logged in to purchase tickets");
          setIsPurchasing(false);
          return;
        }

        if (!user || !user.id) {
          setPurchaseError("User information is missing");
          setIsPurchasing(false);
          return;
        }

        const requests = seats.map((seat) =>
          fetch("api.cinema.z41n.dev/ticket", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              seatId: seat.id,
              screeningId: selectedScreening.id,
            }),
          })
        );

        const responses = await Promise.all(requests);
        const results = await Promise.all(responses.map((res) => res.json()));

        const failed = results.find((result, i) => !responses[i].ok);
        if (failed) {
          throw new Error(
            failed.message || "One or more ticket purchases failed"
          );
        }

        // All purchases succeeded
        setPurchasedSeats(seats);
        setShowSeatSelectionModal(false);
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error purchasing tickets:", error);
        setPurchaseError(
          error instanceof Error
            ? error.message
            : "An error occurred during purchase"
        );
      } finally {
        setIsPurchasing(false);
      }
    },
    [selectedScreening, user]
  );

  const handleCloseSuccess = useCallback(() => {
    setShowSuccessModal(false);
    setSelectedScreening(null);
    setTicketQuantity(0);
    setPurchasedSeats([]);
    refreshData();
    refreshUser();
  }, [refreshData, refreshUser]);

  // Safe modal state setters
  const closeTicketQuantityModal = useCallback(() => {
    setShowTicketQuantityModal(false);
  }, []);

  const closeSeatSelectionModal = useCallback(() => {
    setShowSeatSelectionModal(false);
  }, []);

  return {
    selectedScreening,
    ticketQuantity,
    purchasedSeats,
    showTicketQuantityModal,
    showSeatSelectionModal,
    showSuccessModal,
    handleScreeningSelect,
    handleQuantityContinue,
    handlePurchase,
    handleCloseSuccess,
    setShowTicketQuantityModal: closeTicketQuantityModal,
    setShowSeatSelectionModal: closeSeatSelectionModal,
    isPurchasing,
    purchaseError,
  };
}

export default useTicketPurchase;
