"use client"

import { useState } from "react"
import {
  ArrowLeft,
  FileText,
  Code,
  Book,
  Settings,
  HelpCircle,
  Layers,
  Lightbulb,
  ChevronRight,
  Copy,
  Terminal,
  Database,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  Network,
  Clock,
  Download,
} from "lucide-react"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"

interface DocumentationPageProps {
  section: string
  onBack: () => void
}

const sectionData = {
  guide: {
    title: "Getting Started",
    icon: <Book className="w-4 h-4" />,
    content: {
      overview:
        "Welcome to GitMesh! This comprehensive guide will help you get up and running with the decentralized version control system that's revolutionizing how teams collaborate on code.",
      prerequisites: {
        title: "System Prerequisites",
        content: `Before installing GitMesh, ensure your system meets these requirements:

• Node.js 18.0+ or Go 1.19+ (for native performance)
• Git 2.30+ (for compatibility mode and migration tools)
• OpenSSL 1.1.1+ for cryptographic operations
• Minimum 2GB RAM, 10GB disk space (recommended: 8GB RAM, 50GB SSD)
• Network connectivity for mesh operations (ports 9001-9010)
• Docker 20.10+ (optional, for containerized deployments)`,
        systemRequirements: {
          Linux: "Ubuntu 20.04+, CentOS 8+, Arch Linux, Alpine 3.14+",
          macOS: "macOS 11.0+ (Big Sur), Apple Silicon and Intel supported",
          Windows: "Windows 10 20H2+, WSL2 recommended for optimal performance",
          Docker: "Docker 20.10+ with BuildKit support, Compose v2",
          Cloud: "AWS, GCP, Azure compatible with Kubernetes 1.21+",
        },
        networkRequirements: {
          Bandwidth: "Minimum 1Mbps up/down, recommended 10Mbps+",
          Latency: "Sub-100ms for optimal mesh performance",
          Ports: "TCP 9001-9010, UDP 9001-9010 for peer discovery",
          Firewall: "Allow outbound HTTPS (443) for bootstrap nodes",
          NAT: "UPnP or manual port forwarding for home networks",
        },
      },
      installation: {
        title: "Installation Methods",
        npm: `# Install via npm (recommended for Node.js environments)
npm install -g @gitmesh/cli@latest

# Verify installation and run diagnostics
gitmesh --version
gitmesh doctor --verbose
gitmesh config --global init.defaultBranch main

# Enable shell completions (bash/zsh/fish)
gitmesh completion bash > /etc/bash_completion.d/gitmesh
gitmesh completion zsh > ~/.zsh/completions/_gitmesh`,
        curl: `# Install via curl (Unix systems, automatic updates)
curl -fsSL https://install.gitmesh.dev/install.sh | bash -s -- --version=latest

# Custom installation directory
curl -fsSL https://install.gitmesh.dev/install.sh | bash -s -- --prefix=/opt/gitmesh

# Add to PATH (if not automatic)
echo 'export PATH="/opt/gitmesh/bin:$PATH"' >> ~/.bashrc
echo 'export GITMESH_CONFIG_HOME="$HOME/.config/gitmesh"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
gitmesh version --build-info`,
        docker: `# Run in Docker container (development)
docker run -it --rm \\
  -v $(pwd):/workspace \\
  -v ~/.gitmesh:/root/.gitmesh \\
  -p 9001-9010:9001-9010 \\
  gitmesh/cli:latest

# Production Docker Compose setup
version: '3.8'
services:
  gitmesh:
    image: gitmesh/cli:2.1.0
    volumes:
      - ./repositories:/data/repositories
      - gitmesh_config:/root/.gitmesh
    ports:
      - "9001-9010:9001-9010"
    environment:
      - GITMESH_LOG_LEVEL=info
      - GITMESH_MESH_BOOTSTRAP=mesh://bootstrap.gitmesh.dev:9001
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "gitmesh", "health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  gitmesh_config:`,
        kubernetes: `# Kubernetes deployment (enterprise)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gitmesh-node
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gitmesh
  template:
    metadata:
      labels:
        app: gitmesh
    spec:
      containers:
      - name: gitmesh
        image: gitmesh/enterprise:2.1.0
        ports:
        - containerPort: 9001
        env:
        - name: GITMESH_CLUSTER_MODE
          value: "kubernetes"
        - name: GITMESH_STORAGE_CLASS
          value: "fast-ssd"
        volumeMounts:
        - name: gitmesh-data
          mountPath: /data
        resources:
          requests:
            memory: "2Gi"
            cpu: "500m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
      volumes:
      - name: gitmesh-data
        persistentVolumeClaim:
          claimName: gitmesh-pvc`,
        source: `# Build from source (advanced users)
git clone https://github.com/gitmesh/gitmesh.git
cd gitmesh

# Install build dependencies
make deps

# Build with optimizations
make build OPTIMIZE=true FEATURES=enterprise,crypto-accel

# Run test suite
make test-all

# Install system-wide
sudo make install PREFIX=/usr/local

# Or install to custom location
make install PREFIX=$HOME/.local`,
      },
      quickStart: {
        title: "Quick Start Tutorial",
        init: `# Initialize a new mesh repository with advanced options
mkdir my-gitmesh-project && cd my-gitmesh-project

# Initialize with specific template and mesh configuration
gitmesh init \\
  --template=enterprise \\
  --mesh-id="team-alpha-$(date +%s)" \\
  --encryption=chacha20-poly1305 \\
  --consensus=raft \\
  --storage-backend=rocksdb

# Configure your cryptographic identity
gitmesh config user.name "Alice Developer"
gitmesh config user.email "alice@company.com"
gitmesh config user.signingkey "$(gitmesh keygen --algorithm=ed25519)"
gitmesh config user.encryptionkey "$(gitmesh keygen --algorithm=x25519)"

# Set up organizational policies
gitmesh config policy.requireSignatures true
gitmesh config policy.enforceLinearHistory false
gitmesh config policy.maxCommitSize "50MB"`,
        firstCommit: `# Create your first cryptographically signed commit
echo "# My GitMesh Project" > README.md
echo "Built with GitMesh - Decentralized Version Control" >> README.md

# Create comprehensive .gitmeshignore
cat > .gitmeshignore << 'EOF'
# Dependencies
node_modules/
vendor/
.pnp/

# Build outputs
dist/
build/
*.exe
*.dll
*.so
*.dylib

# Logs and databases
*.log
*.sqlite
*.db

# Environment and secrets
.env*
*.key
*.pem
*.p12
secrets/

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
Thumbs.db
EOF

# Stage and commit with verification
gitmesh add .
gitmesh commit \\
  --message "feat: initial project setup with GitMesh configuration" \\
  --sign \\
  --verify-tree \\
  --generate-proof

# View detailed commit history with cryptographic verification
gitmesh log \\
  --verify-signatures \\
  --show-proofs \\
  --format=detailed \\
  --graph`,
        meshSetup: `# Connect to the mesh network with advanced configuration
gitmesh mesh init \\
  --network-id="company-mesh-$(whoami)" \\
  --discovery-method="mdns+dht+bootstrap" \\
  --transport="quic+tcp+websocket" \\
  --max-peers=50 \\
  --min-peers=3

# Add trusted bootstrap nodes
gitmesh mesh add-bootstrap \\
  --address="mesh://bootstrap1.company.com:9001" \\
  --public-key="ed25519:AAAA...ZZZZ" \\
  --trust-level=high

gitmesh mesh add-bootstrap \\
  --address="mesh://bootstrap2.company.com:9001" \\
  --public-key="ed25519:BBBB...YYYY" \\
  --trust-level=high

# Configure regional peers for better performance
gitmesh mesh add-peer \\
  --address="mesh://us-west.company.com:9001" \\
  --region="us-west" \\
  --priority=high

gitmesh mesh add-peer \\
  --address="mesh://eu-central.company.com:9001" \\
  --region="eu-central" \\
  --priority=medium

# Start mesh with monitoring and metrics
gitmesh mesh start \\
  --daemon \\
  --log-level=info \\
  --metrics-port=9090 \\
  --health-check-interval=30s

# Perform initial synchronization with conflict resolution
gitmesh sync \\
  --all-peers \\
  --strategy=three-way-merge \\
  --conflict-resolution=interactive \\
  --verify-integrity \\
  --progress`,
        advancedWorkflow: `# Advanced workflow with branching and merging
# Create feature branch with mesh-aware tracking
gitmesh checkout -b feature/advanced-crypto \\
  --track-mesh \\
  --sync-policy=eventual-consistency

# Work on feature with automatic mesh sync
echo "Advanced cryptographic features" > crypto.md
gitmesh add crypto.md
gitmesh commit -m "feat: add advanced crypto documentation" --auto-sync

# Create and push to mesh (no central server needed)
gitmesh push mesh --all-branches --verify-signatures

# Merge with conflict resolution and verification
gitmesh checkout main
gitmesh merge feature/advanced-crypto \\
  --strategy=recursive \\
  --verify-signatures \\
  --generate-merge-proof \\
  --sign-merge

# Clean up and optimize repository
gitmesh gc --aggressive --verify-integrity
gitmesh mesh optimize --repack --deduplicate`,
      },
      fileStructure: {
        ".gitmesh/": {
          description: "GitMesh configuration and metadata directory (similar to .git but enhanced)",
          children: {
            config: "Repository configuration file with mesh-specific settings",
            HEAD: "Current branch reference with cryptographic verification",
            "refs/": "Branch and tag references with signature verification",
            "objects/": "Compressed object database with integrity hashes",
            "mesh/": "Mesh network configuration and peer information",
            "keys/": "Cryptographic keys and certificates for signing/encryption",
            "hooks/": "Git-compatible hooks directory with mesh extensions",
            index: "Staging area with cryptographic checksums",
            "logs/": "Reference logs with tamper-evident logging",
            "info/": "Repository metadata and statistics",
            "packed-refs": "Packed references for performance optimization",
          },
        },
        "gitmesh.config.json": {
          description: "Main configuration file with comprehensive mesh settings",
          example: `{
  "version": "2.1.0",
  "meshId": "team-alpha-mesh-001",
  "created": "2024-01-15T10:30:00Z",
  "network": {
    "discovery": ["mdns", "dht", "bootstrap"],
    "transport": ["quic", "tcp", "websocket"],
    "encryption": {
      "algorithm": "chacha20-poly1305",
      "keyRotation": "30d",
      "perfectForwardSecrecy": true
    },
    "bootstrap": [
      "mesh://bootstrap1.gitmesh.dev:9001",
      "mesh://bootstrap2.gitmesh.dev:9001"
    ],
    "maxPeers": 50,
    "minPeers": 3,
    "connectionTimeout": "30s",
    "heartbeatInterval": "10s"
  },
  "sync": {
    "strategy": "eventual-consistency",
    "conflictResolution": "three-way-merge",
    "batchSize": 1000,
    "maxBatchAge": "5m",
    "compressionLevel": 6,
    "verifyIntegrity": true
  },
  "security": {
    "signCommits": true,
    "verifySignatures": true,
    "requireSignatures": false,
    "trustModel": "web-of-trust",
    "keyAlgorithm": "ed25519",
    "hashAlgorithm": "blake3"
  },
  "storage": {
    "backend": "rocksdb",
    "compression": "zstd",
    "cacheSize": "256MB",
    "bloomFilterBits": 10
  },
  "policies": {
    "maxCommitSize": "50MB",
    "maxFileSize": "100MB",
    "enforceLinearHistory": false,
    "allowForceUpdates": false,
    "requireCodeReview": true
  }
}`,
        },
        ".gitmeshignore": {
          description: "Files and patterns to ignore in mesh operations (extends .gitignore)",
          example: `# GitMesh specific ignores
.gitmesh/tmp/
.gitmesh/cache/
*.gitmesh-tmp

# Dependencies and packages
node_modules/
vendor/
.pnp/
.pnp.js
bower_components/

# Build outputs and artifacts
dist/
build/
out/
target/
bin/
obj/
*.exe
*.dll
*.so
*.dylib
*.app

# Logs and databases
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.sqlite
*.sqlite3
*.db
*.db-journal

# Runtime and temporary files
pids/
*.pid
*.seed
*.pid.lock
.tmp/
tmp/
temp/

# Environment and configuration
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
config/secrets.yml
secrets/

# Security and cryptographic files
*.key
*.pem
*.p12
*.pfx
*.crt
*.cer
*.der
keystore
truststore

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~
.project
.classpath
.settings/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# Package manager files
package-lock.json
yarn.lock
Pipfile.lock
Gemfile.lock
composer.lock

# Coverage and testing
coverage/
.nyc_output/
.coverage
htmlcov/
.pytest_cache/
.tox/

# Documentation builds
_site/
.jekyll-cache/
.sass-cache/
docs/_build/`,
        },
        "mesh-topology.json": {
          description: "Current mesh network topology and peer relationships",
          example: `{
  "topology": {
    "nodeId": "gm_alice_dev_001",
    "region": "us-west-2",
    "lastUpdated": "2024-01-15T15:45:30Z",
    "peers": [
      {
        "id": "gm_bob_dev_002",
        "address": "mesh://192.168.1.100:9001",
        "publicKey": "ed25519:AAAA1234...ZZZZ9876",
        "region": "us-west-2",
        "latency": "15ms",
        "bandwidth": "100Mbps",
        "reliability": 0.99,
        "lastSeen": "2024-01-15T15:45:25Z",
        "trustLevel": "high",
        "sharedRepositories": ["repo1", "repo2"]
      }
    ],
    "clusters": [
      {
        "id": "us-west-cluster",
        "nodes": ["gm_alice_dev_001", "gm_bob_dev_002"],
        "coordinator": "gm_alice_dev_001"
      }
    ]
  }
}`,
        },
      },
      troubleshooting: {
        title: "Troubleshooting & Diagnostics",
        networkIssues: `# Network connectivity and peer discovery problems
# Run comprehensive network diagnostics
gitmesh mesh diagnose --verbose --export-report

# Check mesh network status with detailed information
gitmesh mesh status \\
  --show-topology \\
  --show-latency \\
  --show-bandwidth \\
  --format=json

# Test connectivity to specific peers
gitmesh mesh ping gm_peer_001 --count=10 --timeout=5s
gitmesh mesh traceroute gm_peer_001 --max-hops=15

# Reset mesh configuration while preserving data
gitmesh mesh reset \\
  --keep-data \\
  --keep-keys \\
  --regenerate-topology

# Force reconnection with exponential backoff
gitmesh mesh reconnect \\
  --force \\
  --retry-count=5 \\
  --backoff-strategy=exponential`,
        syncConflicts: `# Handle complex synchronization conflicts
# Analyze conflict patterns and resolution strategies
gitmesh status \\
  --conflicts \\
  --show-resolution-suggestions \\
  --format=detailed

# Automatic conflict resolution with fallback strategies
gitmesh resolve \\
  --strategy=three-way-merge \\
  --fallback=manual \\
  --preserve-history \\
  --verify-resolution

# Manual conflict resolution with advanced tools
gitmesh mergetool \\
  --tool=vimdiff \\
  --gui \\
  --backup-original \\
  --verify-signatures

# Conflict prevention through policy enforcement
gitmesh config policy.conflictPrevention true
gitmesh config policy.requireLinearHistory false
gitmesh config policy.autoRebase true`,
        performance: `# Performance optimization and tuning
# Aggressive garbage collection with verification
gitmesh gc \\
  --aggressive \\
  --verify-integrity \\
  --optimize-pack-files \\
  --prune-unreachable \\
  --expire=2.weeks.ago

# Repository optimization and compression
gitmesh repack \\
  --delta-compression \\
  --window=250 \\
  --depth=50 \\
  --threads=auto

# Mesh performance tuning
gitmesh config mesh.batchSize 500
gitmesh config mesh.compressionLevel 6
gitmesh config mesh.maxConcurrentSyncs 10
gitmesh config core.preloadIndex true
gitmesh config core.untrackedCache true

# Enable performance monitoring
gitmesh config telemetry.enabled true
gitmesh config telemetry.metricsPort 9090
gitmesh config telemetry.tracingEnabled true`,
        securityIssues: `# Security diagnostics and hardening
# Verify cryptographic integrity of entire repository
gitmesh verify \\
  --all-objects \\
  --verify-signatures \\
  --check-trust-chain \\
  --report-suspicious

# Audit security configuration
gitmesh security audit \\
  --check-key-strength \\
  --verify-policies \\
  --scan-vulnerabilities \\
  --export-report

# Key rotation and certificate management
gitmesh keys rotate \\
  --algorithm=ed25519 \\
  --backup-old-keys \\
  --update-mesh-peers \\
  --verify-rotation

# Security policy enforcement
gitmesh policy enforce \\
  --require-signatures \\
  --verify-trust-chain \\
  --block-unsigned-commits \\
  --audit-log`,
      },
    },
  },
  concept: {
    title: "Core Concepts",
    icon: <Lightbulb className="w-4 h-4" />,
    content: {
      overview:
        "Understanding the fundamental concepts behind GitMesh's revolutionary decentralized architecture and how it differs from traditional centralized version control systems.",
      meshNetwork: {
        title: "Mesh Network Architecture",
        content: `GitMesh creates a peer-to-peer network where each repository can sync with multiple peers simultaneously, eliminating single points of failure and enabling true distributed development.

Key characteristics:
• No central server dependency
• Automatic peer discovery via mDNS and DHT
• Redundant data storage across multiple nodes
• Self-healing network topology
• Byzantine fault tolerance`,
        topology: {
          "Full Mesh": "Every node connects to every other node (small teams)",
          "Partial Mesh": "Strategic connections based on team structure",
          "Hub-and-Spoke": "Regional hubs with local clusters",
          Hierarchical: "Multi-tier architecture for large organizations",
        },
      },
      cryptographicSecurity: {
        title: "Cryptographic Security Model",
        content: `All commits are cryptographically signed and verified using modern elliptic curve cryptography, ensuring data integrity and authenticity across the mesh.

Security features:
• Ed25519 signatures for all commits
• X25519 key exchange for peer communication
• ChaCha20-Poly1305 for data encryption
• Merkle tree verification for data integrity
• Zero-knowledge proofs for privacy`,
        algorithms: {
          Signing: "Ed25519 (fast, secure, deterministic)",
          Encryption: "ChaCha20-Poly1305 (authenticated encryption)",
          "Key Exchange": "X25519 (Elliptic Curve Diffie-Hellman)",
          Hashing: "BLAKE3 (faster than SHA-256, parallel)",
          Compression: "Zstandard (better ratio than gzip)",
        },
      },
      consensusAlgorithm: {
        title: "Consensus and Conflict Resolution",
        content: `GitMesh employs a sophisticated CRDT-based consensus algorithm for conflict-free replicated data types, enabling automatic merge resolution in most scenarios.

Consensus mechanisms:
• Vector clocks for causality tracking
• Operational transformation for text merging
• Last-writer-wins for simple conflicts
• Three-way merge for complex scenarios
• Manual resolution for semantic conflicts`,
        strategies: {
          Automatic: "90% of conflicts resolved without user intervention",
          "Semi-automatic": "Suggested resolutions with user confirmation",
          Manual: "Complex semantic conflicts require developer input",
          "Policy-based": "Organization-defined resolution rules",
        },
      },
      dataModel: {
        title: "Distributed Data Model",
        content: `GitMesh uses an advanced object model that extends Git's design with mesh-specific metadata and cryptographic proofs.

Object types:
• Blob: File content with integrity hashes
• Tree: Directory structure with permissions
• Commit: Change record with signatures
• Mesh: Network topology and peer info
• Proof: Cryptographic verification data`,
        storage: {
          "Content-Addressed": "Objects identified by cryptographic hash",
          Compressed: "Zstandard compression for efficiency",
          Deduplicated: "Identical content stored once",
          Encrypted: "At-rest encryption with user keys",
          Distributed: "Replicated across multiple peers",
        },
      },
      fileStructure: {
        "mesh-nodes/": {
          description: "Connected peer repositories and their metadata",
          children: {
            "active/": "Currently connected peers",
            "known/": "Previously seen peers",
            "trusted/": "Cryptographically verified peers",
            "blacklist/": "Blocked or malicious peers",
          },
        },
        "sync-state/": {
          description: "Synchronization metadata and conflict resolution",
          children: {
            "vector-clocks/": "Causality tracking data",
            "merge-bases/": "Common ancestor information",
            "conflicts/": "Unresolved merge conflicts",
            "resolutions/": "Applied conflict resolutions",
          },
        },
        "crypto-keys/": {
          description: "Cryptographic key storage and management",
          children: {
            "identity/": "User identity keys (Ed25519)",
            "transport/": "Network encryption keys (X25519)",
            "signing/": "Commit signing certificates",
            "revoked/": "Revoked or expired keys",
          },
        },
      },
    },
  },
  reference: {
    title: "API Reference",
    icon: <Code className="w-4 h-4" />,
    content: {
      overview: "Complete API documentation for GitMesh commands, configuration options, and programmatic interfaces.",
      coreCommands: {
        title: "Core Commands",
        repository: `# Repository Management
gitmesh init [options] [directory]
  --template=<name>     Use predefined template
  --bare               Create bare repository
  --mesh-id=<id>       Set mesh network identifier

gitmesh clone <url> [directory]
  --depth=<n>          Shallow clone with depth
  --mesh-peers=<list>  Initial peer connections
  --verify-signatures  Verify all signatures on clone`,
        staging: `# Staging and Commits
gitmesh add <pathspec>...
  --all, -A            Add all tracked and untracked files
  --update, -u         Add only tracked files
  --patch, -p          Interactive patch mode

gitmesh commit [options]
  --message=<msg>, -m  Commit message
  --sign, -S           GPG sign the commit
  --verify             Verify signatures before commit
  --mesh-broadcast     Immediately broadcast to mesh`,
        mesh: `# Mesh Operations
gitmesh mesh init --network-id=<id>
gitmesh mesh connect <peer-address>
gitmesh mesh disconnect <peer-id>
gitmesh mesh status [--verbose]
gitmesh mesh peers [--health-check]
gitmesh mesh topology [--graph]`,
        sync: `# Synchronization
gitmesh sync [options]
  --all-peers          Sync with all connected peers
  --peer=<id>          Sync with specific peer
  --strategy=<name>    Use specific sync strategy
  --dry-run            Show what would be synced
  --force              Force sync ignoring conflicts`,
      },
      configuration: {
        title: "Configuration Reference",
        core: `# Core Configuration
[core]
    repositoryformatversion = 2
    filemode = true
    bare = false
    logallrefupdates = true
    preloadindex = true
    untrackedcache = true

[mesh]
    networkid = "team-mesh-001"
    discovery = "mdns+dht"
    transport = "quic+tcp"
    encryption = "chacha20-poly1305"
    batchsize = 1000
    timeout = 30s`,
        network: `# Network Configuration
[network]
    listen = ["0.0.0.0:9001", "[::]:9001"]
    announce = ["192.168.1.100:9001"]
    bootstrap = [
        "mesh://bootstrap1.gitmesh.dev:9001",
        "mesh://bootstrap2.gitmesh.dev:9001"
    ]
    maxpeers = 50
    minpeers = 3`,
        security: `# Security Configuration
[security]
    signcommits = true
    verifysignatures = true
    requiresignatures = false
    keyrotation = "30d"
    encryptobjects = true
    
[trust]
    model = "web-of-trust"
    threshold = 2
    autoaccept = false`,
      },
      api: {
        title: "Programmatic API",
        javascript: `// JavaScript/Node.js API
const { GitMesh } = require('@gitmesh/core');

const mesh = new GitMesh({
  repositoryPath: './my-repo',
  networkId: 'team-mesh-001',
  identity: {
    name: 'Alice Developer',
    email: 'alice@example.com',
    signingKey: process.env.GITMESH_SIGNING_KEY
  }
});

// Initialize repository
await mesh.init();

// Connect to peers
await mesh.connectPeer('mesh://peer1.example.com:9001');

// Make a commit
const commitId = await mesh.commit({
  message: 'Add new feature',
  files: ['src/feature.js'],
  sign: true
});

// Sync with mesh
await mesh.sync({ strategy: 'eventual-consistency' });`,
        python: `# Python API
from gitmesh import GitMesh, MeshConfig

config = MeshConfig(
    repository_path='./my-repo',
    network_id='team-mesh-001',
    identity={
        'name': 'Alice Developer',
        'email': 'alice@example.com'
    }
)

mesh = GitMesh(config)

# Initialize and connect
await mesh.init()
await mesh.connect_peer('mesh://peer1.example.com:9001')

# Make commit and sync
commit_id = await mesh.commit(
    message='Add new feature',
    files=['src/feature.py'],
    sign=True
)
await mesh.sync(strategy='eventual-consistency')`,
        rest: `# REST API Endpoints
POST /api/v1/repositories
GET  /api/v1/repositories/{id}
PUT  /api/v1/repositories/{id}/config

POST /api/v1/commits
GET  /api/v1/commits/{hash}
GET  /api/v1/commits/{hash}/verify

POST /api/v1/mesh/peers
GET  /api/v1/mesh/peers
DELETE /api/v1/mesh/peers/{id}

POST /api/v1/sync
GET  /api/v1/sync/status
POST /api/v1/sync/resolve-conflicts`,
      },
      fileStructure: {
        "api/": {
          description: "API endpoint definitions and schemas",
          children: {
            "v1/": "Version 1 API endpoints",
            "v2/": "Version 2 API endpoints (beta)",
            "schemas/": "JSON Schema definitions",
            "examples/": "API usage examples",
          },
        },
        "cli/": {
          description: "Command-line interface implementation",
          children: {
            "commands/": "Individual command implementations",
            "parsers/": "Argument parsing logic",
            "formatters/": "Output formatting utilities",
            "completions/": "Shell completion scripts",
          },
        },
      },
    },
  },
  tutorial: {
    title: "Tutorials",
    icon: <FileText className="w-4 h-4" />,
    content: {
      overview: "Step-by-step tutorials for common GitMesh workflows and use cases.",
      distributedTeam:
        "Learn how to set up GitMesh for a distributed development team with automatic conflict resolution.",
      offlineSync: "Configure GitMesh to work seamlessly in offline environments with delayed synchronization.",
      fileStructure: {
        "tutorials/": "Tutorial content and examples",
        "examples/": "Sample projects and configurations",
        "workflows/": "Common workflow patterns",
        "best-practices/": "Recommended practices",
      },
    },
  },
  architecture: {
    title: "Architecture",
    icon: <Layers className="w-4 h-4" />,
    content: {
      overview: "Deep dive into GitMesh's technical architecture and design decisions.",
      p2pProtocol: "GitMesh uses a custom P2P protocol built on libp2p for reliable peer discovery and communication.",
      consensusAlgorithm:
        "The system employs a CRDT-based consensus algorithm for conflict-free replicated data types.",
      fileStructure: {
        "core/": "Core system components",
        "network/": "P2P networking layer",
        "consensus/": "Consensus algorithm implementation",
        "storage/": "Data storage and indexing",
      },
    },
  },
  config: {
    title: "Configuration",
    icon: <Settings className="w-4 h-4" />,
    content: {
      overview: "Comprehensive guide to configuring GitMesh for your specific needs.",
      networkSettings: "Configure network timeouts, peer discovery, and connection limits for optimal performance.",
      securityOptions: "Set up encryption, key management, and access control policies.",
      fileStructure: {
        "config/": "Configuration files",
        "templates/": "Configuration templates",
        "schemas/": "JSON schemas for validation",
        "examples/": "Example configurations",
      },
    },
  },
  example: {
    title: "Examples",
    icon: <Code className="w-4 h-4" />,
    content: {
      overview: "Real-world examples and use cases demonstrating GitMesh capabilities.",
      openSource: "See how major open source projects are using GitMesh for distributed development.",
      enterprise: "Enterprise deployment patterns and best practices for large-scale adoption.",
      fileStructure: {
        "open-source/": "Open source project examples",
        "enterprise/": "Enterprise use cases",
        "integrations/": "Third-party integrations",
        "demos/": "Interactive demonstrations",
      },
    },
  },
  support: {
    title: "Troubleshooting",
    icon: <HelpCircle className="w-4 h-4" />,
    content: {
      overview: "Common issues and their solutions, plus debugging guides.",
      commonIssues: "Resolve the most frequently encountered problems with GitMesh installations and configurations.",
      debugging: "Learn how to debug mesh network issues and performance problems.",
      fileStructure: {
        "troubleshooting/": "Troubleshooting guides",
        "faq/": "Frequently asked questions",
        "logs/": "Log file examples",
        "diagnostics/": "Diagnostic tools",
      },
    },
  },
}

export default function DocumentationPage({ section, onBack }: DocumentationPageProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const data = sectionData[section as keyof typeof sectionData]

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const renderContent = (content: any, level = 0) => {
    if (typeof content === "string") {
      const codeId = `code-${Math.random()}`
      const isCommand = content.includes("#") || content.includes("gitmesh") || content.includes("npm")

      return (
        <div className="bg-[#0d1117] border border-white/10 rounded-lg relative group">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-white/60 font-medium">{isCommand ? "Terminal" : "Configuration"}</span>
            </div>
            <button
              onClick={() => copyToClipboard(content, codeId)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                copiedCode === codeId
                  ? "bg-green-500/20 text-green-400"
                  : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
              }`}
            >
              {copiedCode === codeId ? (
                <>
                  <CheckCircle className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="p-4">
            <pre className="text-white/90 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {content}
            </pre>
          </div>
        </div>
      )
    }

    if (typeof content === "object" && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value]) => {
            if (key === "title") return null

            const getIcon = (key: string) => {
              if (key.includes("network") || key.includes("mesh")) return <Network className="w-3 h-3" />
              if (key.includes("security") || key.includes("crypto")) return <Shield className="w-3 h-3" />
              if (key.includes("performance") || key.includes("optimization")) return <Zap className="w-3 h-3" />
              if (key.includes("config") || key.includes("setting")) return <Settings className="w-3 h-3" />
              if (key.includes("trouble") || key.includes("issue")) return <AlertTriangle className="w-3 h-3" />
              return <ChevronRight className="w-3 h-3" />
            }

            return (
              <div key={key} className="space-y-2">
                <h4 className="text-sm font-semibold text-white capitalize flex items-center gap-2 py-1">
                  {getIcon(key)}
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h4>
                <div className="ml-5 space-y-3 border-l border-white/10 pl-4">{renderContent(value, level + 1)}</div>
              </div>
            )
          })}
        </div>
      )
    }

    return <div className="text-white/70 text-xs leading-relaxed">{String(content)}</div>
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Documentation Hub
          </button>
          <h1 className="text-2xl font-bold">Section not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-[#0a0a0a] text-white ${inter.variable} ${ppEditorialNewUltralightItalic.variable}`}
    >
      {/* Enhanced header with search and filters */}
      <div className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Hub
              </button>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                {data.icon}
                <h1 className={`${ppEditorialNewUltralightItalic.className} text-lg font-light italic`}>
                  {data.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white/70 text-xs">
                <div className="font-medium">GitMesh Documentation Hub (LFDT Supported)</div>
              </div>
            </div>
          </div>

          {/* Search and filter bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/40" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter className="w-3 h-3 text-white/40" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">All Content</option>
                <option value="commands">Commands</option>
                <option value="config">Configuration</option>
                <option value="examples">Examples</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Enhanced sidebar navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 sticky top-32">
              <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 px-2">Sections</div>
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
                  activeTab === "overview"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Info className="w-3 h-3" />
                Overview
              </button>
              {Object.keys(data.content)
                .filter((key) => key !== "overview")
                .map((key) => {
                  const getTabIcon = (key: string) => {
                    if (key.includes("install")) return <Download className="w-3 h-3" />
                    if (key.includes("quick") || key.includes("start")) return <Zap className="w-3 h-3" />
                    if (key.includes("file") || key.includes("structure")) return <Database className="w-3 h-3" />
                    if (key.includes("trouble")) return <AlertTriangle className="w-3 h-3" />
                    return <FileText className="w-3 h-3" />
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors capitalize flex items-center gap-2 ${
                        activeTab === key
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {getTabIcon(key)}
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </button>
                  )
                })}
            </nav>
          </div>

          {/* Enhanced main content area */}
          <div className="lg:col-span-5">
            <div className="prose prose-invert max-w-none">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h2 className="text-lg font-bold mb-2 text-white">Overview</h2>
                        <p className="text-white/80 text-xs leading-relaxed">{data.content.overview}</p>
                      </div>
                    </div>
                  </div>

                  {data.content.fileStructure && (
                    <div>
                      <h3 className="text-base font-semibold mb-3 text-white flex items-center gap-2">
                        <Database className="w-4 h-4 text-blue-400" />
                        File Structure Reference
                      </h3>
                      <div className="bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3 h-3 text-blue-400" />
                            <span className="text-xs font-medium text-white/80">Project Structure</span>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          {Object.entries(data.content.fileStructure).map(([path, item]) => (
                            <div key={path} className="space-y-2">
                              <div className="flex items-start gap-3 py-1">
                                <code className="text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-0.5 rounded flex-shrink-0 border border-blue-500/20">
                                  {path}
                                </code>
                                <span className="text-white/70 text-xs leading-relaxed">
                                  {typeof item === "string" ? item : item.description}
                                </span>
                              </div>
                              {typeof item === "object" && item.children && (
                                <div className="ml-6 space-y-1 border-l border-white/10 pl-3">
                                  {Object.entries(item.children).map(([childPath, childDesc]) => (
                                    <div key={childPath} className="flex items-start gap-3 py-0.5">
                                      <code className="text-green-400 font-mono text-xs bg-green-500/10 px-1.5 py-0.5 rounded flex-shrink-0 border border-green-500/20">
                                        {childPath}
                                      </code>
                                      <span className="text-white/60 text-xs leading-relaxed">{childDesc}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab !== "overview" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <h2 className="text-lg font-bold text-white capitalize">
                      {activeTab.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <div className="flex-1" />
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <Clock className="w-3 h-3" />
                      Last updated: Jan 15, 2024
                    </div>
                  </div>

                  <div className="space-y-4">{renderContent(data.content[activeTab as keyof typeof data.content])}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
