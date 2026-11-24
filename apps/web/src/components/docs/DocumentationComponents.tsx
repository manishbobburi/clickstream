import * as React from 'react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockLine,
} from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { TerminalIcon, Info } from 'lucide-react';
import { useHighlightedCode } from '@/hooks/use-highlighted-code';

interface DocSectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  description?: string;
}

export function DocSection({
  id,
  title,
  description,
  children,
  className,
  ...props
}: DocSectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 pt-16 first:pt-4 space-y-8', className)}
      {...props}
    >
      <div className="space-y-2 pb-4 border-b border-border/70 max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>

      {children && <div className="space-y-10">{children}</div>}
    </section>
  );
}

interface DocSubSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
}

export function DocSubSection({ id, title, children, className, ...props }: DocSubSectionProps) {
  return (
    <div
      id={id}
      className={cn('scroll-mt-24 space-y-4 pt-6 first:pt-0 max-w-4xl', className)}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      </div>
      <div className="space-y-3.5">{children}</div>
    </div>
  );
}

export function DocParagraph({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm leading-6 text-muted-foreground max-w-4xl not-first:mt-2', className)}
      {...props}
    />
  );
}

export function DocHeading4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn('text-sm font-medium tracking-tight text-foreground pt-1', className)}
      {...props}
    />
  );
}

export function DocInlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted/60 px-[0.35rem] py-[0.15rem] font-mono text-xs text-foreground',
        className
      )}
      {...props}
    />
  );
}

interface DocCodeBlockProps {
  filename?: string;
  code: string;
  allowCopy?: boolean;
  className?: string;
}

export function DocCodeBlock({ filename, code, allowCopy = true, className }: DocCodeBlockProps) {
  const lines = useHighlightedCode(code, 'ts');

  return (
    <div className={cn('w-full max-w-4xl min-w-0', className)}>
      <CodeBlock className="rounded-xl border border-border bg-code text-code-foreground w-full min-w-0 overflow-hidden">
        <CodeBlockHeader className="flex items-center justify-between px-4 py-2.5 border-b border-border">
          <CodeBlockTitle className="font-mono text-xs font-normal text-muted-foreground">
            {filename || 'code'}
          </CodeBlockTitle>
          {allowCopy && (
            <CodeBlockCopyButton
              value={code}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          )}
        </CodeBlockHeader>

        <CodeBlockContent className="overflow-x-auto p-4 w-full min-w-0">
          {lines.map((line, index) => (
            <CodeBlockLine key={index} variant="default">
              {line}
            </CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}

export interface DocCommandItem {
  id: string;
  label: string;
  code: string;
  prompt?: string;
}

interface DocTerminalCommandTabsProps {
  showIcon?: boolean;
  commands: DocCommandItem[];
  defaultTab?: string;
  title?: string;
  prompt?: string;
  showPrompt?: boolean;
  allowCopy?: boolean;
  className?: string;
}

export function DocTerminalCommandTabs({
  showIcon = true,
  commands,
  defaultTab,
  title = 'Terminal',
  prompt = '$',
  showPrompt = true,
  className,
  allowCopy = true,
}: DocTerminalCommandTabsProps) {
  if (!commands.length) return null;

  const activeDefault = defaultTab ?? commands[0].id;

  return (
    <div className={cn('flex w-full max-w-4xl min-w-0 flex-col gap-4', className)}>
      <Tabs defaultValue={activeDefault} className="w-full min-w-0">
        <TabsList>
          {commands.map((cmd) => (
            <TabsTrigger key={cmd.id} value={cmd.id}>
              {cmd.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {commands.map((cmd) => {
          const activePrompt = cmd.prompt ?? prompt;

          return (
            <TabsContent key={cmd.id} value={cmd.id} className="min-w-0">
              <CodeBlock className="rounded-xl border border-border bg-code text-code-foreground w-full min-w-0 overflow-hidden">
                <CodeBlockHeader className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                  <CodeBlockTitle className="flex items-center gap-1.5 font-mono text-xs font-normal text-muted-foreground">
                    {showIcon && <TerminalIcon className="size-3.5" />}
                    {title}
                  </CodeBlockTitle>
                  {allowCopy && (
                    <CodeBlockCopyButton
                      value={cmd.code}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  )}
                </CodeBlockHeader>

                <CodeBlockContent className="text-muted-foreground p-4 overflow-x-auto w-full min-w-0">
                  {showPrompt && activePrompt} {cmd.code}
                </CodeBlockContent>
              </CodeBlock>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

interface DocTerminalCommandProps {
  showIcon?: boolean;
  command: string;
  title?: string;
  prompt?: string;
  showPrompt?: boolean;
  allowCopy?: boolean;
  className?: string;
}

export function DocTerminalCommand({
  showIcon = true,
  command,
  title = 'Terminal',
  prompt = '$',
  showPrompt = true,
  allowCopy = true,
  className,
}: DocTerminalCommandProps) {
  return (
    <div className={cn('flex w-full max-w-4xl min-w-0 flex-col gap-4', className)}>
      <CodeBlock
        className={cn(
          'bg-accent rounded-xl border border-border w-full min-w-0 overflow-hidden',
          className
        )}
      >
        <CodeBlockHeader className="flex items-center justify-between px-4 py-2.5 border-b border-border">
          <CodeBlockTitle className="flex items-center gap-1.5 font-mono text-xs font-normal text-muted-foreground">
            {showIcon && <TerminalIcon className="size-3.5" />}
            {title}
          </CodeBlockTitle>
          {allowCopy && (
            <CodeBlockCopyButton
              value={command}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          )}
        </CodeBlockHeader>
        <CodeBlockContent className="text-muted-foreground p-4 overflow-x-auto w-full min-w-0">
          {showPrompt && prompt} {command}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}

interface DocCalloutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DocCallout({ title, children, className }: DocCalloutProps) {
  return (
    <Alert
      className={cn(
        'border-l-2 border-l-zinc-400 dark:border-l-zinc-500 bg-muted/30 w-full max-w-4xl py-3 px-4',
        className
      )}
    >
      <Info className="h-4 w-4 text-zinc-400 dark:text-zinc-500 mt-0.5" />
      <AlertTitle className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </AlertTitle>
      <AlertDescription className="text-sm text-muted-foreground leading-relaxed mt-1">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function DocList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-2 ml-4 list-disc space-y-1.5 text-sm text-muted-foreground marker:text-foreground max-w-4xl">
      {items.map((item, idx) => (
        <li key={idx} className="leading-6 pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export interface DocTableProps extends React.HTMLAttributes<HTMLDivElement> {
  headers?: React.ReactNode[];
  rows?: React.ReactNode[][];
  children?: React.ReactNode;
  allowHorizontalScroll?: boolean;
  multiline?: boolean;
}

function renderCellContent(cell: React.ReactNode) {
  if (cell === '-' || cell === '-' || cell === null || cell === undefined || cell === '') {
    return <span className="text-muted-foreground select-none">-</span>;
  }
  return cell;
}

export function DocTable({
  headers,
  rows,
  children,
  allowHorizontalScroll,
  multiline,
  className,
  ...props
}: DocTableProps) {
  const isMultiline =
    multiline ?? (allowHorizontalScroll !== undefined ? !allowHorizontalScroll : false);

  return (
    <div
      className={cn(
        'w-full max-w-4xl overflow-hidden rounded-xl border border-border my-4',
        className
      )}
      {...props}
    >
      <Table>
        {headers && headers.length > 0 && (
          <TableHeader className="bg-sidebar">
            <TableRow className="hover:bg-sidebar">
              {headers.map((head, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-3 whitespace-nowrap font-medium text-foreground"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        {rows && rows.length > 0 && (
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={cn(
                      'px-4 py-3 align-middle text-sm',
                      cellIndex === row.length - 1
                        ? isMultiline
                          ? 'text-muted-foreground leading-relaxed whitespace-normal min-w-[260px]'
                          : 'text-muted-foreground text-xs leading-relaxed whitespace-nowrap'
                        : 'whitespace-nowrap'
                    )}
                  >
                    {renderCellContent(cell)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
        {children}
      </Table>
    </div>
  );
}

export const DocTableHeader = TableHeader;
export const DocTableBody = TableBody;
export const DocTableRow = TableRow;
export const DocTableHead = TableHead;
export const DocTableCell = TableCell;
