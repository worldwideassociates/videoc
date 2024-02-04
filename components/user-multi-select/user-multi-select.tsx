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
  selected: Option[]
  onSelect(options: Option[]): void
  placeholder?: string
}

export default function MultiSelect({ selected, onSelect, users, ...props }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((option: Option) => {
    const newOptions = selected.filter(s => s.value !== option.value)
    onSelect(newOptions)
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          const newSelected = [...selected];
          newSelected.pop();
          onSelect(newSelected)
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = users.map(user => ({ label: user.name, value: user.id, image: user.image }))
    .filter(option => !selected.includes(option));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant='outline' className='min-w-[100px]'>
                <div className="flex space-x-2 py-1 items-center">
                  <CustomAvatar
                    image={option.image || undefined}
                    initials={option.label?.split(' ').map((n: string) => n[0]).join('') || ''}
                    className="w-8 h-8"
                  />
                  <span className="text-gray-500">{option.label}</span>
                </div>
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
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
                      const exists = selected.find(s => s.value === option.value)
                      if (exists) return
                      onSelect([...selected, option])
                    }}
                    className={"cursor-pointer"}
                  >
                    {option.label}
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