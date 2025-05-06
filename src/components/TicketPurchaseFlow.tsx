"use client";

import React, { memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import AuditoriumCard from "./AuditoriumCard";
import { Separator } from "./ui/separator";
import MovieBlock from "./MovieBlock";
import { Auditorium, Movie, ScreeningNormalized, Theatre } from "@/lib/types";
import PurchaseSuccessModal from "./PurchaseSuccessModal";
import useTicketPurchase from "@/lib/TicketPurchaseHook";
import SeatSelectionModal from "./SeatSelectionModal";
import TicketQuantityModal from "./TicketQuantityModal";

type GroupedByTheatre = Record<
  string,
  {
    theatre: Theatre;
    movies: Record<
      string,
      {
        movie: Movie;
        auditoriums: Record<
          string,
          {
            auditorium: Auditorium;
            screenings: ScreeningNormalized[];
          }
        >;
      }
    >;
  }
>;

// Memoized AuditoriumCardWrapper to prevent unnecessary re-renders
const AuditoriumCardWrapper = memo(
  ({
    auditoriumGroup,
    handleScreeningSelect,
  }: {
    auditoriumGroup: {
      auditorium: Auditorium;
      screenings: ScreeningNormalized[];
    };
    handleScreeningSelect: (screening: ScreeningNormalized) => void;
  }) => {
    return (
      <AuditoriumCard
        auditoriumGroup={auditoriumGroup}
        handleScreeningSelect={handleScreeningSelect}
      />
    );
  }
);

AuditoriumCardWrapper.displayName = "AuditoriumCardWrapper";

function TicketPurchaseFlow({
  groupedByTheatre,
}: {
  groupedByTheatre: GroupedByTheatre;
}) {
  const {
    selectedScreening,
    ticketQuantity,
    purchasedSeats,
    showTicketQuantityModal,
    showSeatSelectionModal,
    showSuccessModal,
    isPurchasing,
    purchaseError,
    handleScreeningSelect,
    handleQuantityContinue,
    handlePurchase,
    handleCloseSuccess,
    setShowTicketQuantityModal,
    setShowSeatSelectionModal,
  } = useTicketPurchase();

  // Early return if there's no data
  if (!groupedByTheatre || Object.keys(groupedByTheatre).length === 0) {
    return (
      <div className="p-4 text-center text-white">No screenings available</div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {Object.entries(groupedByTheatre).map(([theatreId, theatreGroup]) => (
        <div key={theatreId}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-4xl mx-15">
                {theatreGroup.theatre.name}
              </AccordionTrigger>
              <AccordionContent className="mx-15">
                <div className="flex flex-col gap-2">
                  {Object.entries(theatreGroup.movies).map(
                    ([movieId, movieGroup]) => (
                      <div
                        key={movieId}
                        className="flex flex-col lg:flex-row gap-5 mt-20 mb-20 justify-between"
                      >
                        <div className="w-full lg:w-1/2">
                          <MovieBlock movie={movieGroup.movie} />
                        </div>
                        <div className="flex flex-col gap-5 w-full lg:w-1/2">
                          {Object.entries(movieGroup.auditoriums).map(
                            ([auditoriumType, auditoriumGroup]) => (
                              <div key={auditoriumGroup.auditorium.id}>
                                <AuditoriumCardWrapper
                                  auditoriumGroup={auditoriumGroup}
                                  handleScreeningSelect={handleScreeningSelect}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="my-5 bg-white" />
        </div>
      ))}

      {/* Modals */}
      {showTicketQuantityModal && (
        <TicketQuantityModal
          isOpen={showTicketQuantityModal}
          onClose={() => setShowTicketQuantityModal()}
          screening={selectedScreening}
          onContinue={handleQuantityContinue}
        />
      )}

      {showSeatSelectionModal && (
        <SeatSelectionModal
          isOpen={showSeatSelectionModal}
          onClose={() => setShowSeatSelectionModal()}
          screening={selectedScreening}
          quantity={ticketQuantity}
          onPurchase={handlePurchase}
        />
      )}

      {showSuccessModal && (
        <PurchaseSuccessModal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccess}
          seats={purchasedSeats}
          isLoading={isPurchasing}
          error={purchaseError}
        />
      )}
    </div>
  );
}

export default TicketPurchaseFlow;
