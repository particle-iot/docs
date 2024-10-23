---
title: Muon HATs (community)
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-cloud,api-helper-projects,zip]
---

# {{title}}

The Muon has a 40-pin expansion connector that is compatible with the Raspberry Pi, allowing the use of some
Raspberry Pi HATs (expansion cards) to be used with the Muon. Since the Muon is not an actual Raspberry Pi,
not all cards are compatible and most require different firmware libraries. Fortunately, many HATs use 
common chips that already have Particle or Arduino libraries, which generally work with little or no
modification.

Additional pages include:

- [Automation HATs](/hardware/muon-hats/automation-hats/) for home automation.
- [Environmental hats](/hardware/muon-hats/environmental-hats/) for environment monitoring.
- [Display HATs](/hardware/muon-hats/display-hats/) LED and OLED displays.
- [RS485 and CAN HAT](/hardware/muon-hats/rs485-can-hat/) for interfacing with Modbus or CAN bus.

## Contributing

If you'd like to contribute a project: 

{{!-- BEGIN shared-blurb 5936a310-48d6-434b-9d74-30309e77309a --}}
Content must be submitted in Markdown format using [basic Github markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax). 

- A good way to both submit your content and validate the Markdown is to store it your personal Github repository. The content will be copied out of this so it's only for managing versions until your content has been added to the Particle docs.
- Or you can submit a zip file containing your content.

Add any images, either in the same directory as the README.md file, or in an `images` subdirectory. Use the `![alt text](image.png)` style of embedding images in your .md file. Recommended size is 1600px wide, but images can be smaller or larger if necessary. When rendered in the docs, the images will be around 800px wide, so if necessary to reveal details click to display at full size will be included when converted. Avoid referencing images on external services.

{{imageOverlay src="/assets/images/integrations/integrations-blynk.png" alt="Integrations options" class="no-darken"}}

You can include diagrams using in the same way as [Github Mermaid](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/) (triple back tick mermaid).

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

You can include a video, but you must be able to implement your project without having to watch the video. You should externally host videos on YouTube or Vimeo on your channel. A video is optional.

If you have device firmware, create a standard project with a [project.properties](http://project.properties) file, src directory, etc. and include it in a subdirectory. The project file browser and zip download of the source will be added when converted into docs format.

{{> project-browser project="logic-cloud-alerts" default-file="src/logic-cloud-alerts.cpp" height="400"}}


If you design files such as Eagle CAD files, for hardware projects, just include the files in a subdirectory; the zip file download link will be generated in the docs if necessary. If you are using Eagle CAD, an interactive viewer for your schematic can be added so users can zoom in and print a high resolution version even if they don't have Eagle CAD.

{{imageOverlay src="/assets/images/m2-eval/1.2/p1.png" large="/assets/images/m2-eval/1.2/p1.svg" alt="Schematic Page 1"}}


The documentation content at docs.particle.io is Apache 2 licensed, so submissions will have that license as well.

Once your content is ready, send an email to docs-submission (at) particle.io. That email can also be used to request updates.
{{!-- END shared-blurb --}}
