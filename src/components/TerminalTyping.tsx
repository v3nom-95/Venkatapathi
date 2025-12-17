import { useEffect, useState, useRef } from 'react';
import { animate } from 'animejs';

interface Command {
  prompt: string;
  output: string[];
  delay?: number;
}

const commands: Command[] = [
  {
    prompt: 'nmap -sV --script vuln target.com',
    output: [
      'Starting Nmap 7.94 ( https://nmap.org )',
      'Scanning target.com...',
      'PORT     STATE SERVICE  VERSION',
      '22/tcp   open  ssh      OpenSSH 8.9',
      '80/tcp   open  http     Apache/2.4.54',
      '443/tcp  open  https    nginx/1.22',
      'Host is up (0.015s latency)',
    ],
  },
  {
    prompt: 'python3 exploit.py --target 192.168.1.1',
    output: [
      '[*] Initializing exploit framework...',
      '[+] Target acquired: 192.168.1.1',
      '[*] Scanning for vulnerabilities...',
      '[!] Found: CVE-2024-XXXX',
      '[+] Payload delivered successfully',
      '[*] Establishing reverse shell...',
      '[+] Access granted. Welcome, v3nom95.',
    ],
    delay: 1500,
  },
  {
    prompt: 'cat /etc/shadow | head -5',
    output: [
      'root:$6$rounds=4096$...:19234:0:99999:7:::',
      'daemon:*:19234:0:99999:7:::',
      'bin:*:19234:0:99999:7:::',
      'sys:*:19234:0:99999:7:::',
      '[REDACTED FOR DEMO]',
    ],
    delay: 1000,
  },
];

export const TerminalTyping = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const typePrompt = (cmd: Command, charIndex: number) => {
      if (charIndex <= cmd.prompt.length) {
        setCurrentPrompt(cmd.prompt.slice(0, charIndex));
        timeout = setTimeout(() => typePrompt(cmd, charIndex + 1), 50 + Math.random() * 30);
      } else {
        // Finished typing prompt, show output
        setIsTyping(false);
        timeout = setTimeout(() => showOutput(cmd, 0), 500);
      }
    };

    const showOutput = (cmd: Command, lineIndex: number) => {
      if (lineIndex < cmd.output.length) {
        setDisplayedLines(prev => [...prev, cmd.output[lineIndex]]);
        timeout = setTimeout(() => showOutput(cmd, lineIndex + 1), 150 + Math.random() * 100);
      } else {
        // Move to next command
        timeout = setTimeout(() => {
          setCurrentCommand(prev => (prev + 1) % commands.length);
          setCurrentPrompt('');
          setIsTyping(true);
        }, cmd.delay || 2000);
      }
    };

    const cmd = commands[currentCommand];
    if (currentCommand === 0 && displayedLines.length === 0) {
      // First run
      timeout = setTimeout(() => typePrompt(cmd, 0), 1000);
    } else if (isTyping && currentPrompt === '') {
      typePrompt(cmd, 0);
    }

    return () => clearTimeout(timeout);
  }, [currentCommand, isTyping, currentPrompt]);

  useEffect(() => {
    // Reset when starting new command cycle
    if (currentCommand === 0 && currentPrompt === '' && isTyping) {
      setDisplayedLines([]);
    }
  }, [currentCommand, currentPrompt, isTyping]);

  useEffect(() => {
    // Auto-scroll
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentPrompt]);

  useEffect(() => {
    // Blink cursor animation
    animate('.terminal-cursor', {
      opacity: [1, 0, 1],
      duration: 1000,
      loop: true,
      ease: 'steps(2)',
    });
  }, []);

  return (
    <div className="card-cyber p-4 font-mono text-sm max-w-2xl mx-auto">
      {/* Terminal header */}
      <div className="flex items-center gap-2 pb-3 border-b border-border mb-3">
        <div className="w-3 h-3 rounded-full bg-neon-red" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span className="ml-2 text-muted-foreground text-xs">v3nom95@kali:~</span>
      </div>
      
      {/* Terminal content */}
      <div ref={terminalRef} className="h-64 overflow-y-auto space-y-1 scrollbar-thin">
        {/* Previous outputs */}
        {displayedLines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith('[+]') ? 'text-primary' :
              line.startsWith('[*]') ? 'text-secondary' :
              line.startsWith('[!]') ? 'text-neon-red' :
              line.includes('open') ? 'text-primary' :
              'text-muted-foreground'
            }`}
          >
            {line}
          </div>
        ))}
        
        {/* Current prompt line */}
        {isTyping && (
          <div className="flex items-center text-foreground">
            <span className="text-primary mr-2">root@v3nom95:~$</span>
            <span>{currentPrompt}</span>
            <span className="terminal-cursor ml-0.5 w-2 h-4 bg-primary inline-block" />
          </div>
        )}
      </div>
    </div>
  );
};
