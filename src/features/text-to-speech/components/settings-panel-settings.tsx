"use client";

import { useStore } from "@tanstack/react-form";

import { Slider } from "@/components/ui/slider";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useTypedAppFormContext } from "@/hooks/use-app-form";

import { sliders } from "@/features/text-to-speech/data/sliders";
import { ttsFormOptions } from "@/features/text-to-speech/components/text-to-speech-form";

export function SettingsPanelSettings() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <>
      {/* Voice Style Dropdown Section */}
      <div className="border-b border-dashed p-4">
        <p className="text-muted-foreground text-sm">
          Voice selector coming soon
        </p>
      </div>

      {/* Voice Adjustments Section */}
      <div className="flex-1 p-4">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {slider.leftLabel}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {slider.rightLabel}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className="**:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-track]:h-1"
                  />
                </Field>
                
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
}
