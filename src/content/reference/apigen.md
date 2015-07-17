---
title: Cloud API Gen
template: reference.hbs
columns: three
order: 6
---

# Particle Cloud API

<table></table>

{{#each apiGroups}}

## {{@key}}

{{#each this}}
### {{title}}
<pre class='api-code api-definition'><code class='prettyprint lang-json'>{{uppercase type}} {{url}}</code></pre>
{{{description}}}

{{#each parameter.fields}}
<ul class='api-attributes api-request'>
{{#each this}}
<li>
<div class='api-field'>{{field}}{{#unless optional}}<span class='field-required'>REQUIRED</span>{{/unless}}<small>{{strip-html type}}</small></div>
<div class='field-desc'>{{#if description}}{{strip-html description}}{{else}}&mdash;{{/if}}</div>
</li>
{{/each}}
</ul>
{{/each}}

{{#each success.fields}}
<ul class='api-attributes api-response'>
{{#each this}}
<li>
<div class='api-field'>{{field}}<small>{{strip-html type}}</small></div>
<div class='field-desc'>{{#if description}}{{strip-html description}}{{else}}&mdash;{{/if}}</div>
</li>

{{#if this.nestedParams}}
<li class='nested-wrapper'>
<ul class='nested-params'>
{{#each this.nestedParams}}
<li class='nested-param'>
<div class='api-field'>{{field}}<small>{{strip-html type}}</small></div>
<div class='field-desc'>{{#if description}}{{strip-html description}}{{else}}&mdash;{{/if}}</div>
</li>
{{/each}}
</ul></li>
{{/if}}

{{/each}}
</ul>
{{/each}}

{{#each success.examples}}
<pre class='api-code api-response-example'><code class='prettyprint lang-json'>{{{this.content}}}</code></pre>
{{/each}}

{{/each}}

{{/each}}
