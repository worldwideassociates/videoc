"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { User } from "@prisma/client";
import { CustomAvatar } from "../custom-avatar";

type Option = Record<"value" | "label" | "image", string | null>;


interface Props {
  users: User[]
  selected: Option
  onSelect(option: Option): void
  placeholder?: string
}

export default function UserSelect({ selected, onSelect, users, ...props }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");


  const selectables = users.map(user => ({ label: user.name, value: user.id, image: user.image }))
    .filter(option => option.value !== selected.value);

  return (
    <Command className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {
            selected.value && (
              <div className="flex space-x-2 py-1 items-center">
                <CustomAvatar
                  image={selected.image || undefined}
                  initials={selected.label?.split(' ').map((n: string) => n[0]).join('') || ''}
                  className="w-8 h-8"
                />
                <span className="text-gray-500">{selected.label}</span>
              </div>
            )
          }
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            {...props}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("")
                      setOpen(false)
                      onSelect(option)
                    }}
                    className={"cursor-pointer"}
                  >
                    <div className="flex space-x-2 py-1 items-center">
                      <CustomAvatar
                        image={option.image || undefined}
                        initials={option.label?.split(' ').map((n: string) => n[0]).join('') || ''}
                        className="w-8 h-8"
                      />
                      <span className="text-gray-500">{option.label}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
}