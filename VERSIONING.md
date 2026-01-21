# CogniAI Version Tracking

## Current Version: 1.0.0

### Versioning Scheme
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes or significant feature overhauls
- **MINOR**: New features, backward-compatible
- **PATCH**: Bug fixes, minor improvements

### Build Information
Each production build includes:
- `APP_VERSION`: The semantic version from package.json
- `BUILD_ID`: Unix timestamp of the build
- `BUILD_TIMESTAMP`: ISO 8601 timestamp
- `GIT_COMMIT`: Short SHA of the git commit

### Usage
Import version info in your components:
```typescript
import { APP_VERSION, getVersionInfo } from "@/lib/version";
```

### Changelog

#### v1.0.0 (2026-01-06)
- Initial release with MedinovAI branding
- Hero section with clinical excellence messaging
- Problem/Solution section for healthcare pain points
- Feature showcase: AI assessments, compliance, role-specific testing
- Target segments for Hospitals and CROs
- Trust & Security section (HIPAA, SOC 2)
- Lead capture CTAs (Request Early Access, Book a Demo)
- Footer with version display
