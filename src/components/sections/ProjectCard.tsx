"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Media } from "@/components/ui/Media";
import { icons } from "@/lib/icons";
import type { Project } from "@/types";
import { cn } from "@/utils/cn";

const ExternalIcon = icons.external;

export interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const trackPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (element === null) {
      return;
    }

    const box = element.getBoundingClientRect();
    element.style.setProperty("--pointer-x", `${event.clientX - box.left}px`);
    element.style.setProperty("--pointer-y", `${event.clientY - box.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={trackPointer}
      className="group relative h-full"
    >
      <Card
        as="article"
        interactive
        padding="none"
        className="flex h-full flex-col overflow-hidden"
      >
        <span
          aria-hidden="true"
          className="cursor-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-standard ease-state can-hover:group-hover:opacity-100"
        />

        <div className="relative overflow-hidden">
          <Media
            src={project.preview.src}
            alt={project.preview.alt}
            label={project.preview.label}
            aspect="video"
            radius="lg"
            seed={project.id}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={cn(
              "rounded-none border-0 transition-transform duration-standard ease-state",
              "motion-safe:can-hover:group-hover:scale-103",
            )}
          />
        </div>

        <div className="relative flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-primary">{project.title}</h3>
            <p className="text-sm text-secondary">{project.description}</p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge variant="default" size="sm">
                  {technology}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.links.map((link) => (
              <Button
                key={link.href + link.label}
                href={link.href}
                external={link.external}
                variant="secondary"
                size="sm"
              >
                {link.label}
                <ExternalIcon className="size-4" aria-hidden="true" />
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
