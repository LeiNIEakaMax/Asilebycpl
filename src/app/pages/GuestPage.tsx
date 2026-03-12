import { useState } from "react";
import { GuestStep, GuestState } from "./guest/types";
import { GuestProgressBar } from "./guest/GuestProgressBar";
import { ScannerScreen } from "./guest/ScannerScreen";
import { WelcomeScreen } from "./guest/WelcomeScreen";
import { UploadScreen } from "./guest/UploadScreen";
import { PickerScreen } from "./guest/PickerScreen";
import { SuccessScreen } from "./guest/SuccessScreen";

const INITIAL_STATE: GuestState = {
  step: "scanner",
  guestName: "",
  guestNote: "",
  selectedPhotos: [],
  uploadedPhotos: [],
};

export function GuestPage() {
  const [state, setState] = useState<GuestState>(INITIAL_STATE);

  const setStep = (step: GuestStep) =>
    setState((prev) => ({ ...prev, step }));

  const handleFoundCode = () => setStep("welcome");

  const handleWelcomeContinue = (name: string, note: string) => {
    setState((prev) => ({ ...prev, guestName: name, guestNote: note, step: "upload" }));
  };

  const handleWelcomeBack = () => setStep("scanner");

  const handleOpenPicker = () => setStep("picker");

  const handlePickerAdd = (selected: string[]) => {
    setState((prev) => ({ ...prev, selectedPhotos: selected, step: "upload" }));
  };

  const handlePickerCancel = () => setStep("upload");

  const handleRemovePhoto = (url: string) => {
    setState((prev) => ({
      ...prev,
      selectedPhotos: prev.selectedPhotos.filter((u) => u !== url),
    }));
  };

  const handleSend = () => {
    setState((prev) => ({
      ...prev,
      uploadedPhotos: [...prev.selectedPhotos],
      selectedPhotos: [],
      step: "success",
    }));
  };

  const handleUploadBack = () => setStep("welcome");

  const handleUploadMore = () => {
    setState((prev) => ({
      ...prev,
      selectedPhotos: [],
      step: "upload",
    }));
  };

  const handleDone = () => {
    setState(INITIAL_STATE);
  };

  const { step, guestName, guestNote, selectedPhotos, uploadedPhotos } = state;

  return (
    <div
      style={{
        fontFamily: "var(--font-family)",
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100dvh",
        position: "relative",
        backgroundColor: step === "scanner" ? "#000" : "var(--background)",
      }}
    >
      <GuestProgressBar step={step} />

      {step === "scanner" && <ScannerScreen onFound={handleFoundCode} />}

      {step === "welcome" && (
        <WelcomeScreen
          onBack={handleWelcomeBack}
          onContinue={handleWelcomeContinue}
          initialName={guestName}
          initialNote={guestNote}
        />
      )}

      {step === "upload" && (
        <UploadScreen
          guestName={guestName}
          selectedPhotos={selectedPhotos}
          onBack={handleUploadBack}
          onOpenPicker={handleOpenPicker}
          onRemovePhoto={handleRemovePhoto}
          onSend={handleSend}
        />
      )}

      {step === "picker" && (
        <PickerScreen
          initialSelected={selectedPhotos}
          onCancel={handlePickerCancel}
          onAdd={handlePickerAdd}
        />
      )}

      {step === "success" && (
        <SuccessScreen
          guestName={guestName}
          guestNote={guestNote}
          uploadedPhotos={uploadedPhotos}
          onUploadMore={handleUploadMore}
          onDone={handleDone}
        />
      )}
    </div>
  );
}
